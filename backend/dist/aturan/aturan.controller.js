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
exports.AturanController = void 0;
const common_1 = require("@nestjs/common");
const aturan_service_1 = require("./aturan.service");
const authGuard_1 = require("../guards/authGuard");
const adminGuard_1 = require("../guards/adminGuard");
const aturan_model_1 = require("../model/aturan.model");
let AturanController = class AturanController {
    constructor(aturanService) {
        this.aturanService = aturanService;
    }
    async getAll(search, page, limit) {
        const request = {
            search: search || '',
            page: page || 1,
            limit: limit || 10,
        };
        const aturan = await this.aturanService.getAll(request);
        return {
            success: true,
            message: 'Berhasil mengambil data aturan',
            data: aturan.data,
            paging: aturan.paging,
        };
    }
    async create(request) {
        await this.aturanService.create(request);
        return {
            success: true,
            message: 'Berhasil menambahkan aturan',
        };
    }
    async put(request, params) {
        const result = await this.aturanService.put(request, params?.id || '');
        return {
            success: true,
            message: 'Berhasil mengedit aturan',
            data: result,
        };
    }
    async delete(request) {
        await this.aturanService.delete(request);
        return {
            success: true,
            message: 'Berhasil menghapus aturan',
        };
    }
};
exports.AturanController = AturanController;
__decorate([
    (0, common_1.UseGuards)(authGuard_1.AuthGuard),
    (0, common_1.HttpCode)(200),
    (0, common_1.Get)(),
    __param(0, (0, common_1.Query)('search')),
    __param(1, (0, common_1.Query)('page', new common_1.ParseIntPipe({ optional: true }))),
    __param(2, (0, common_1.Query)('limit', new common_1.ParseIntPipe({ optional: true }))),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Number, Number]),
    __metadata("design:returntype", Promise)
], AturanController.prototype, "getAll", null);
__decorate([
    (0, common_1.UseGuards)(authGuard_1.AuthGuard, adminGuard_1.AdminGuard),
    (0, common_1.HttpCode)(201),
    (0, common_1.Post)(),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [aturan_model_1.ReqCreateAturan]),
    __metadata("design:returntype", Promise)
], AturanController.prototype, "create", null);
__decorate([
    (0, common_1.UseGuards)(authGuard_1.AuthGuard, adminGuard_1.AdminGuard),
    (0, common_1.Put)(':id'),
    __param(0, (0, common_1.Body)()),
    __param(1, (0, common_1.Param)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [aturan_model_1.ReqPutAturan, Object]),
    __metadata("design:returntype", Promise)
], AturanController.prototype, "put", null);
__decorate([
    (0, common_1.UseGuards)(authGuard_1.AuthGuard, adminGuard_1.AdminGuard),
    (0, common_1.HttpCode)(200),
    (0, common_1.Delete)(),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [aturan_model_1.ReqDeleteAturan]),
    __metadata("design:returntype", Promise)
], AturanController.prototype, "delete", null);
exports.AturanController = AturanController = __decorate([
    (0, common_1.Controller)('api/rules'),
    __metadata("design:paramtypes", [aturan_service_1.AturanService])
], AturanController);
//# sourceMappingURL=aturan.controller.js.map