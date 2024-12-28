"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.DiagnosisService = void 0;
const common_1 = require("@nestjs/common");
const dignosis_validation_1 = require("./dignosis.validation");
const prisma_service_1 = require("../common/prisma.service");
const validation_service_1 = require("../common/validation.service");
const schedule_1 = require("@nestjs/schedule");
let DiagnosisService = class DiagnosisService {
    constructor(validationService, prismaService) {
        this.validationService = validationService;
        this.prismaService = prismaService;
    }
    async getAll(request) {
        const ReqDiagnos = this.validationService.validate(dignosis_validation_1.DiagnosisValidation.GETALL, request);
        const filter = [];
        if (ReqDiagnos.search) {
            filter.push({
                OR: [
                    {
                        username: {
                            contains: ReqDiagnos.search,
                        },
                    },
                ],
            });
        }
        if (ReqDiagnos.status) {
            filter.push({
                status: ReqDiagnos.status,
            });
        }
        const diagnosis = await this.prismaService.diagnosis.findMany({
            where: {
                user: {
                    isAdmin: false,
                },
                AND: filter,
            },
            skip: (ReqDiagnos.page - 1) * ReqDiagnos.limit,
            take: ReqDiagnos.limit,
            orderBy: {
                createdAt: 'desc',
            },
        });
        const total = await this.prismaService.diagnosis.count({
            where: {
                AND: filter,
            },
        });
        return {
            data: diagnosis.map((d) => ({
                ...d,
                disease: d.disease,
                symptoms: d.symptoms,
            })),
            paging: {
                page: ReqDiagnos.page,
                limit: ReqDiagnos.limit,
                total: total,
                totalPage: Math.ceil(total / ReqDiagnos.limit),
            },
        };
    }
    async delete(request) {
        const disease = await this.prismaService.diagnosis.deleteMany({
            where: {
                id: {
                    in: request.selected,
                },
            },
        });
        if (disease.count == 0 || disease.count < request.selected.length) {
            throw new common_1.HttpException('Diagnosis tidak ditemukan', 404);
        }
        return disease;
    }
    async create(user) {
        const expired = Math.floor(new Date().getTime() / 1000) + 10 * 60;
        const diagnosis = await this.prismaService.diagnosis.create({
            data: {
                username: user.username,
                expired: expired,
                scor: 0,
                symptoms: [],
                status: 'pending',
                disease: [],
            },
        });
        return {
            ...diagnosis,
            disease: diagnosis.disease,
            symptoms: diagnosis.symptoms,
        };
    }
    async get(id) {
        const diagnosis = await this.prismaService.diagnosis.findUnique({
            where: {
                id: id,
            },
        });
        if (!diagnosis) {
            throw new common_1.HttpException('Diagnosis tidak ditemukan', 404);
        }
        const now = new Date().getTime();
        const expired = new Date(diagnosis.expired * 1000).getTime();
        if (expired < now && diagnosis.status === 'pending') {
            const updated = await this.prismaService.diagnosis.update({
                where: {
                    id: id,
                },
                data: {
                    expired: 0,
                    status: 'cancel',
                },
            });
            return {
                ...updated,
                disease: updated.disease,
                symptoms: updated.symptoms,
            };
        }
        if (diagnosis.status === 'finish') {
            const disease = await this.prismaService.disease.findMany({
                where: {
                    id: {
                        in: diagnosis.disease,
                    },
                },
            });
            return {
                ...diagnosis,
                disease: disease,
                symptoms: diagnosis.symptoms,
            };
        }
        return {
            ...diagnosis,
            disease: diagnosis.disease,
            symptoms: diagnosis.symptoms,
        };
    }
    async getDiagnosis(user) {
        try {
            const diagnosis = await this.prismaService.diagnosis.findMany({
                where: {
                    username: user.username,
                    status: 'finish',
                },
                orderBy: {
                    createdAt: 'desc',
                },
            });
            return Promise.all(diagnosis.map(async (d) => {
                const disease = await this.prismaService.disease.findMany({
                    where: {
                        id: {
                            in: d.disease,
                        },
                    },
                });
                return {
                    ...d,
                    disease: disease,
                    symptoms: d.symptoms,
                    expired: d.expired,
                    status: d.status,
                    createdAt: d.createdAt,
                    username: d.username,
                };
            }));
        }
        catch (error) {
            console.log(error);
        }
    }
    async patch(id, request) {
        const reqDiagnosis = this.validationService.validate(dignosis_validation_1.DiagnosisValidation.PATCH, request);
        const answer = reqDiagnosis.symptoms
            .filter((s) => s.answer)
            .map((s) => s.id);
        const totalSymptomOfDisease = await this.prismaService.rule.groupBy({
            by: ['diseaseId'],
            where: {
                symptomId: { in: answer },
            },
            _count: {
                symptomId: true,
            },
        });
        const totalPerDisease = await this.prismaService.rule.groupBy({
            by: ['diseaseId'],
            _count: {
                symptomId: true,
            },
        });
        const score = totalSymptomOfDisease.map((disease) => {
            const total = totalPerDisease.find((total) => total.diseaseId === disease.diseaseId)
                ?._count.symptomId || 1;
            return {
                disease: disease.diseaseId,
                scor: Math.round((disease._count.symptomId / total) * 100),
            };
        });
        const maxScore = Math.max(...score.map((s) => s.scor));
        if (reqDiagnosis.status === 'finish') {
            const disease = score
                .filter((s) => s.scor === maxScore)
                .map((s) => s.disease);
            const updated = await this.prismaService.diagnosis.update({
                where: {
                    id,
                },
                data: {
                    ...reqDiagnosis,
                    scor: maxScore,
                    disease,
                    status: reqDiagnosis.status,
                },
            });
            const diseases = await this.prismaService.disease.findMany({
                where: {
                    id: {
                        in: updated.disease,
                    },
                },
            });
            return {
                ...updated,
                disease: diseases,
                symptoms: updated.symptoms,
            };
        }
        const diagnosis = await this.prismaService.diagnosis.update({
            where: {
                id,
            },
            data: {
                ...reqDiagnosis,
                scor: maxScore,
                disease: [],
                status: reqDiagnosis.status,
            },
        });
        return {
            ...diagnosis,
            disease: diagnosis.disease,
            symptoms: diagnosis.symptoms,
        };
    }
    async cornJob() {
        await this.prismaService.diagnosis.updateMany({
            where: {
                expired: {
                    lte: Math.floor(new Date().getTime() / 1000),
                },
                status: 'pending',
            },
            data: {
                status: 'cancel',
            },
        });
        return true;
    }
};
exports.DiagnosisService = DiagnosisService;
__decorate([
    (0, schedule_1.Cron)('0 0 * * *'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], DiagnosisService.prototype, "cornJob", null);
exports.DiagnosisService = DiagnosisService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [validation_service_1.ValidationService,
        prisma_service_1.PrismaService])
], DiagnosisService);
//# sourceMappingURL=diagnosis.service.js.map