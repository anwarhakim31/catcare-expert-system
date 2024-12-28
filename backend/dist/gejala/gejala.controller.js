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
exports.GejalaController = void 0;
const common_1 = require("@nestjs/common");
const gejala_service_1 = require("./gejala.service");
const gejala_module_1 = require("../model/gejala.module");
const adminGuard_1 = require("../guards/adminGuard");
const authGuard_1 = require("../guards/authGuard");
const penyakit_model_1 = require("../model/penyakit.model");
let GejalaController = class GejalaController {
    constructor(GejalaService) {
        this.GejalaService = GejalaService;
    }
    async getAll(search, page, limit) {
        console.log(search, page, limit);
        const request = {
            search: search || '',
            page: page,
            limit: limit,
        };
        const result = await this.GejalaService.getAll(request);
        return {
            success: true,
            message: 'Berhasil mengambil data gejala',
            data: result.data,
            paging: result.paging,
        };
    }
    async create(request) {
        const result = await this.GejalaService.create(request);
        return {
            success: true,
            message: 'Berhasil menambahkan penyakit',
            data: result,
        };
    }
    async put(request, params) {
        const result = await this.GejalaService.put(request, params?.id || '');
        return {
            success: true,
            message: 'Berhasil mengedit data penyakit',
            data: result,
        };
    }
    async Delete(request) {
        await this.GejalaService.delete(request);
        return {
            success: true,
            message: 'Berhasil menghapus penyakit',
        };
    }
};
exports.GejalaController = GejalaController;
__decorate([
    (0, common_1.Get)(),
    (0, common_1.HttpCode)(200),
    __param(0, (0, common_1.Query)('search')),
    __param(1, (0, common_1.Query)('page', new common_1.ParseIntPipe({ optional: true }))),
    __param(2, (0, common_1.Query)('limit', new common_1.ParseIntPipe({ optional: true }))),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Number, Number]),
    __metadata("design:returntype", Promise)
], GejalaController.prototype, "getAll", null);
__decorate([
    (0, common_1.Post)(),
    (0, common_1.UseGuards)(authGuard_1.AuthGuard, adminGuard_1.AdminGuard),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [gejala_module_1.ReqCreateGejala]),
    __metadata("design:returntype", Promise)
], GejalaController.prototype, "create", null);
__decorate([
    (0, common_1.UseGuards)(authGuard_1.AuthGuard, adminGuard_1.AdminGuard),
    (0, common_1.Put)(':id'),
    __param(0, (0, common_1.Body)()),
    __param(1, (0, common_1.Param)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [gejala_module_1.ReqPutGejala, Object]),
    __metadata("design:returntype", Promise)
], GejalaController.prototype, "put", null);
__decorate([
    (0, common_1.UseGuards)(authGuard_1.AuthGuard, adminGuard_1.AdminGuard),
    (0, common_1.Delete)(),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [penyakit_model_1.ReqDeletePenyakit]),
    __metadata("design:returntype", Promise)
], GejalaController.prototype, "Delete", null);
exports.GejalaController = GejalaController = __decorate([
    (0, common_1.Controller)('api/symptom'),
    __metadata("design:paramtypes", [gejala_service_1.GejalaService])
], GejalaController);
//# sourceMappingURL=gejala.controller.js.map