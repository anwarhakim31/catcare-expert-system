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
exports.DiagnosisController = void 0;
const common_1 = require("@nestjs/common");
const diagnosis_service_1 = require("./diagnosis.service");
const diagnosis_model_1 = require("../model/diagnosis.model");
const authGuard_1 = require("../guards/authGuard");
const user_decorator_1 = require("../decorators/user.decorator");
const auth_model_1 = require("../model/auth.model");
const adminGuard_1 = require("../guards/adminGuard");
let DiagnosisController = class DiagnosisController {
    constructor(dignosisService) {
        this.dignosisService = dignosisService;
    }
    async getAll(search, status, page, limit) {
        const request = {
            search: search || '',
            page: page,
            limit: limit,
            status: status,
        };
        const result = await this.dignosisService.getAll(request);
        return {
            success: true,
            message: 'Berhasil mengambil data penyakit',
            data: result.data,
            paging: result.paging,
        };
    }
    async delete(request) {
        await this.dignosisService.delete(request);
        return {
            success: true,
            message: 'Berhasil mengedit data penyakit',
        };
    }
    async getDianosisUser(user) {
        const result = await this.dignosisService.getDiagnosis(user);
        return {
            success: true,
            message: 'Berhasil mengambil data diagnosis user',
            data: result,
        };
    }
    async create(user) {
        const result = await this.dignosisService.create(user);
        return {
            success: true,
            message: 'Berhasil membuat diagnosis',
            data: result,
        };
    }
    async get(params) {
        const result = await this.dignosisService.get(params.id);
        return {
            success: true,
            message: 'Berhasil mengambil data diagnosis',
            data: result,
        };
    }
    async patch(params, request) {
        const result = await this.dignosisService.patch(params.id, request);
        return {
            success: true,
            message: 'Berhasil membuat diagnosis',
            data: result,
        };
    }
    async cornJob() {
        await this.dignosisService.cornJob();
    }
};
exports.DiagnosisController = DiagnosisController;
__decorate([
    (0, common_1.UseGuards)(authGuard_1.AuthGuard, adminGuard_1.AdminGuard),
    (0, common_1.HttpCode)(200),
    (0, common_1.Get)(),
    __param(0, (0, common_1.Query)('search')),
    __param(1, (0, common_1.Query)(`status`)),
    __param(2, (0, common_1.Query)('page', new common_1.ParseIntPipe({ optional: true }))),
    __param(3, (0, common_1.Query)('limit', new common_1.ParseIntPipe({ optional: true }))),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String, Number, Number]),
    __metadata("design:returntype", Promise)
], DiagnosisController.prototype, "getAll", null);
__decorate([
    (0, common_1.UseGuards)(authGuard_1.AuthGuard, adminGuard_1.AdminGuard),
    (0, common_1.HttpCode)(200),
    (0, common_1.Delete)(),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [diagnosis_model_1.ReqDeleteDiagnosis]),
    __metadata("design:returntype", Promise)
], DiagnosisController.prototype, "delete", null);
__decorate([
    (0, common_1.Get)('user'),
    (0, common_1.HttpCode)(200),
    (0, common_1.UseGuards)(authGuard_1.AuthGuard),
    __param(0, (0, user_decorator_1.User)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [auth_model_1.AuthResponse]),
    __metadata("design:returntype", Promise)
], DiagnosisController.prototype, "getDianosisUser", null);
__decorate([
    (0, common_1.Post)(),
    (0, common_1.UseGuards)(authGuard_1.AuthGuard),
    __param(0, (0, user_decorator_1.User)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [auth_model_1.AuthResponse]),
    __metadata("design:returntype", Promise)
], DiagnosisController.prototype, "create", null);
__decorate([
    (0, common_1.Get)('/:id'),
    (0, common_1.UseGuards)(authGuard_1.AuthGuard),
    __param(0, (0, common_1.Param)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], DiagnosisController.prototype, "get", null);
__decorate([
    (0, common_1.Patch)('/:id'),
    (0, common_1.UseGuards)(authGuard_1.AuthGuard),
    __param(0, (0, common_1.Param)()),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, diagnosis_model_1.ReqPatchDiagnosis]),
    __metadata("design:returntype", Promise)
], DiagnosisController.prototype, "patch", null);
__decorate([
    (0, common_1.Get)('/cron'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], DiagnosisController.prototype, "cornJob", null);
exports.DiagnosisController = DiagnosisController = __decorate([
    (0, common_1.Controller)('api/diagnosis'),
    __metadata("design:paramtypes", [diagnosis_service_1.DiagnosisService])
], DiagnosisController);
//# sourceMappingURL=diagnosis.controller.js.map