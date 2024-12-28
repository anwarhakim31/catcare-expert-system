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
exports.PenyakitService = void 0;
const common_1 = require("@nestjs/common");
const prisma_service_1 = require("../common/prisma.service");
const validation_service_1 = require("../common/validation.service");
const penyakit_validation_1 = require("./penyakit.validation");
let PenyakitService = class PenyakitService {
    constructor(validationService, prismaService) {
        this.validationService = validationService;
        this.prismaService = prismaService;
    }
    async getAll(request) {
        const getReq = this.validationService.validate(penyakit_validation_1.PenyakitValidation.GETALL, request);
        const filter = [];
        if (getReq.search) {
            filter.push({
                name: {
                    contains: getReq.search,
                },
            });
        }
        if (!getReq.limit) {
            const gejala = await this.prismaService.disease.findMany({
                where: {
                    AND: filter,
                },
                orderBy: {
                    id: 'asc',
                },
            });
            return { data: gejala };
        }
        const penyakit = await this.prismaService.disease.findMany({
            where: {
                AND: filter,
            },
            skip: (getReq.page - 1) * getReq.limit,
            take: getReq.limit,
            orderBy: {
                createdAt: 'desc',
            },
        });
        const total = await this.prismaService.disease.count({
            where: {
                AND: filter,
            },
        });
        return {
            data: penyakit,
            paging: {
                limit: getReq.limit,
                totalPage: Math.ceil(total / getReq.limit),
                page: getReq.page,
                total: total,
            },
        };
    }
    async get(id) {
        const disease = await this.prismaService.disease.findUnique({
            where: {
                id: id,
            },
        });
        if (!disease) {
            throw new common_1.HttpException('Penyakit tidak ditemukan', 404);
        }
        return disease;
    }
    async create(request) {
        const penyakitRequest = this.validationService.validate(penyakit_validation_1.PenyakitValidation.CREATE, request);
        const totalDiseaseWithSameId = await this.prismaService.disease.count({
            where: {
                id: penyakitRequest.id,
            },
        });
        if (totalDiseaseWithSameId > 0) {
            throw new common_1.HttpException('ID penyakit sudah digunakan', 400);
        }
        const totalDiseaseWithSameName = await this.prismaService.disease.count({
            where: {
                name: penyakitRequest.name,
            },
        });
        if (totalDiseaseWithSameName > 0) {
            throw new common_1.HttpException('Nama penyakit sudah digunakan', 400);
        }
        const disease = await this.prismaService.disease.create({
            data: {
                ...penyakitRequest,
                id: penyakitRequest.id.toUpperCase(),
            },
        });
        return disease;
    }
    async put(request, id) {
        const penyakitRequest = this.validationService.validate(penyakit_validation_1.PenyakitValidation.PUT, request);
        const totalDiseaseWithSameId = await this.prismaService.disease.count({
            where: {
                id: penyakitRequest.id,
                NOT: {
                    id: id,
                },
            },
        });
        if (totalDiseaseWithSameId > 0) {
            throw new common_1.HttpException('ID penyakit sudah digunakan', 400);
        }
        const totalDiseaseWithSameName = await this.prismaService.disease.count({
            where: {
                name: penyakitRequest.name,
                NOT: {
                    id: id,
                },
            },
        });
        if (totalDiseaseWithSameName > 0) {
            throw new common_1.HttpException('Nama penyakit sudah digunakan', 400);
        }
        const disease = await this.prismaService.disease.update({
            where: {
                id: id,
            },
            data: {
                ...penyakitRequest,
                id: penyakitRequest.id.toUpperCase(),
            },
        });
        if (!disease) {
            throw new common_1.HttpException('Penyakit tidak ditemukan', 404);
        }
        return disease;
    }
    async delete(request) {
        const disease = await this.prismaService.disease.deleteMany({
            where: {
                id: {
                    in: request.selected,
                },
            },
        });
        if (disease.count == 0 || disease.count < request.selected.length) {
            throw new common_1.HttpException('Penyakit tidak ditemukan', 404);
        }
        return disease;
    }
};
exports.PenyakitService = PenyakitService;
exports.PenyakitService = PenyakitService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [validation_service_1.ValidationService,
        prisma_service_1.PrismaService])
], PenyakitService);
//# sourceMappingURL=penyakit.service.js.map