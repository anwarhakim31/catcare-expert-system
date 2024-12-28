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
exports.AturanService = void 0;
const common_1 = require("@nestjs/common");
const prisma_service_1 = require("../common/prisma.service");
const validation_service_1 = require("../common/validation.service");
const aturan_validation_1 = require("./aturan.validation");
let AturanService = class AturanService {
    constructor(prismaService, validationService) {
        this.prismaService = prismaService;
        this.validationService = validationService;
    }
    async getAll(request) {
        const filter = [];
        if (request.search) {
            filter.push({
                OR: [
                    {
                        symptomId: {
                            contains: request.search,
                        },
                    },
                    {
                        diseaseId: {
                            contains: request.search,
                        },
                    },
                ],
            });
        }
        const aturan = await this.prismaService.rule.findMany({
            where: {
                AND: filter,
            },
            include: {
                symptom: true,
                disease: true,
            },
            skip: (request.page - 1) * request.limit,
            take: request.limit,
            orderBy: {
                createdAt: 'desc',
            },
        });
        const total = await this.prismaService.rule.count({
            where: {
                AND: filter,
            },
        });
        return {
            data: aturan,
            paging: {
                total: total,
                page: request.page,
                limit: request.limit,
                totalPage: Math.ceil(total / request.limit),
            },
        };
    }
    async create(request) {
        const aturanRequest = this.validationService.validate(aturan_validation_1.AturanValidation.CREATE, request);
        const total = await this.prismaService.rule.count({
            where: {
                symptomId: aturanRequest.symptomId,
                diseaseId: aturanRequest.diseaseId,
            },
        });
        if (total > 0) {
            throw new common_1.HttpException('Aturan sudah ada', 400);
        }
        const aturan = await this.prismaService.rule.create({
            data: aturanRequest,
        });
        return aturan;
    }
    async put(request, id) {
        const aturanRequest = this.validationService.validate(aturan_validation_1.AturanValidation.PUT, request);
        const totalsymptomWithSame = await this.prismaService.rule.count({
            where: {
                symptomId: aturanRequest.symptomId,
                diseaseId: aturanRequest.diseaseId,
                NOT: {
                    id: id,
                },
            },
        });
        if (totalsymptomWithSame > 0) {
            throw new common_1.HttpException('Aturan sudah ada', 400);
        }
        const symptom = await this.prismaService.rule.update({
            where: {
                id: id,
            },
            data: {
                symptomId: aturanRequest.symptomId,
                diseaseId: aturanRequest.diseaseId,
            },
        });
        if (!symptom) {
            throw new common_1.HttpException('Aturan tidak ditemukan', 404);
        }
        return symptom;
    }
    async delete(request) {
        const symptom = await this.prismaService.rule.deleteMany({
            where: {
                id: {
                    in: request.selected,
                },
            },
        });
        if (symptom.count == 0 || symptom.count < request.selected.length) {
            throw new common_1.HttpException('Aturan tidak ditemukan', 404);
        }
        return symptom;
    }
};
exports.AturanService = AturanService;
exports.AturanService = AturanService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService,
        validation_service_1.ValidationService])
], AturanService);
//# sourceMappingURL=aturan.service.js.map