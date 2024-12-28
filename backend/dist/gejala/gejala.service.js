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
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.GejalaService = void 0;
const common_1 = require("@nestjs/common");
const nest_winston_1 = require("nest-winston");
const prisma_service_1 = require("../common/prisma.service");
const validation_service_1 = require("../common/validation.service");
const gejala_validation_1 = require("./gejala.validation");
let GejalaService = class GejalaService {
    constructor(validationService, logger, prismaService) {
        this.validationService = validationService;
        this.logger = logger;
        this.prismaService = prismaService;
    }
    async getAll(request) {
        const getReq = this.validationService.validate(gejala_validation_1.GejalaValidation.GETALL, request);
        const filter = [];
        if (getReq.search) {
            filter.push({
                OR: [
                    {
                        id: {
                            contains: getReq.search,
                        },
                    },
                    {
                        symptom: {
                            contains: getReq.search,
                        },
                    },
                ],
            });
        }
        if (!getReq.limit) {
            const gejala = await this.prismaService.symptom.findMany({
                where: {
                    AND: filter,
                },
                orderBy: {
                    id: 'asc',
                },
            });
            return { data: gejala };
        }
        const gejala = await this.prismaService.symptom.findMany({
            where: {
                AND: filter,
            },
            skip: (getReq.page - 1) * getReq.limit,
            take: getReq.limit,
            orderBy: {
                createdAt: 'desc',
            },
        });
        const total = await this.prismaService.symptom.count({
            where: {
                AND: filter,
            },
        });
        return {
            data: gejala,
            paging: {
                limit: getReq.limit,
                totalPage: Math.ceil(total / getReq.limit),
                page: getReq.page,
                total: total,
            },
        };
    }
    async create(request) {
        const gejalaRequest = this.validationService.validate(gejala_validation_1.GejalaValidation.CREATE, request);
        const totalsymptomWithSameId = await this.prismaService.symptom.count({
            where: {
                id: gejalaRequest.id,
            },
        });
        if (totalsymptomWithSameId > 0) {
            throw new common_1.HttpException('ID penyakit sudah digunakan', 400);
        }
        const symptom = await this.prismaService.symptom.create({
            data: {
                id: gejalaRequest.id.toUpperCase(),
                symptom: gejalaRequest.symptom,
            },
        });
        return symptom;
    }
    async put(request, id) {
        const gejalaRequest = this.validationService.validate(gejala_validation_1.GejalaValidation.PUT, request);
        const totalsymptomWithSameId = await this.prismaService.symptom.count({
            where: {
                id: gejalaRequest.id,
                NOT: {
                    id: id,
                },
            },
        });
        if (totalsymptomWithSameId > 0) {
            throw new common_1.HttpException('ID penyakit sudah digunakan', 400);
        }
        const symptom = await this.prismaService.symptom.update({
            where: {
                id: id,
            },
            data: {
                id: gejalaRequest.id.toUpperCase(),
                symptom: gejalaRequest.symptom,
            },
        });
        if (!symptom) {
            throw new common_1.HttpException('Penyakit tidak ditemukan', 404);
        }
        return symptom;
    }
    async delete(request) {
        const symptom = await this.prismaService.symptom.deleteMany({
            where: {
                id: {
                    in: request.selected,
                },
            },
        });
        if (symptom.count == 0 || symptom.count < request.selected.length) {
            throw new common_1.HttpException('Penyakit tidak ditemukan', 404);
        }
        return symptom;
    }
};
exports.GejalaService = GejalaService;
exports.GejalaService = GejalaService = __decorate([
    (0, common_1.Injectable)(),
    __param(1, (0, common_1.Inject)(nest_winston_1.WINSTON_MODULE_PROVIDER)),
    __metadata("design:paramtypes", [validation_service_1.ValidationService,
        common_1.Logger,
        prisma_service_1.PrismaService])
], GejalaService);
//# sourceMappingURL=gejala.service.js.map