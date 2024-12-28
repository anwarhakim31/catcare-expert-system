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
exports.UserController = void 0;
const common_1 = require("@nestjs/common");
const user_service_1 = require("./user.service");
const user_model_1 = require("../model/user.model");
const authGuard_1 = require("../guards/authGuard");
const user_decorator_1 = require("../decorators/user.decorator");
const auth_model_1 = require("../model/auth.model");
const adminGuard_1 = require("../guards/adminGuard");
let UserController = class UserController {
    constructor(userService) {
        this.userService = userService;
    }
    async getAll(search, page, limit) {
        const request = {
            search: search || '',
            page: page,
            limit: limit,
        };
        const result = await this.userService.getAll(request);
        return {
            success: true,
            message: 'Berhasil mengambil data penyakit',
            data: result.data,
            paging: result.paging,
        };
    }
    async Delete(request) {
        await this.userService.delete(request);
        return {
            success: true,
            message: 'Berhasil menghapus data pengguna',
        };
    }
    async Put(request) {
        await this.userService.put(request);
        return {
            success: true,
            message: 'Berhasil mengeubah  data pengguna',
        };
    }
    async editProfile(request) {
        return this.userService.editProfile(request);
    }
    async changePassword(request, user) {
        return this.userService.changePassword(user.username, request);
    }
};
exports.UserController = UserController;
__decorate([
    (0, common_1.UseGuards)(authGuard_1.AuthGuard, adminGuard_1.AdminGuard),
    (0, common_1.HttpCode)(200),
    (0, common_1.Get)(),
    __param(0, (0, common_1.Query)('search')),
    __param(1, (0, common_1.Query)('page', new common_1.ParseIntPipe({ optional: true }))),
    __param(2, (0, common_1.Query)('limit', new common_1.ParseIntPipe({ optional: true }))),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Number, Number]),
    __metadata("design:returntype", Promise)
], UserController.prototype, "getAll", null);
__decorate([
    (0, common_1.Delete)(),
    (0, common_1.HttpCode)(200),
    (0, common_1.UseGuards)(authGuard_1.AuthGuard, adminGuard_1.AdminGuard),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [user_model_1.ReqDeletePengguna]),
    __metadata("design:returntype", Promise)
], UserController.prototype, "Delete", null);
__decorate([
    (0, common_1.Put)(),
    (0, common_1.HttpCode)(200),
    (0, common_1.UseGuards)(authGuard_1.AuthGuard, adminGuard_1.AdminGuard),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [user_model_1.ReqPutPengguna]),
    __metadata("design:returntype", Promise)
], UserController.prototype, "Put", null);
__decorate([
    (0, common_1.HttpCode)(200),
    (0, common_1.UseGuards)(authGuard_1.AuthGuard),
    (0, common_1.Patch)('/profile'),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [user_model_1.ReqEditUser]),
    __metadata("design:returntype", Promise)
], UserController.prototype, "editProfile", null);
__decorate([
    (0, common_1.HttpCode)(200),
    (0, common_1.UseGuards)(authGuard_1.AuthGuard),
    (0, common_1.Patch)('/password'),
    __param(0, (0, common_1.Body)()),
    __param(1, (0, user_decorator_1.User)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [user_model_1.ReqEditPassword,
        auth_model_1.AuthResponse]),
    __metadata("design:returntype", Promise)
], UserController.prototype, "changePassword", null);
exports.UserController = UserController = __decorate([
    (0, common_1.Controller)('/api/user'),
    __metadata("design:paramtypes", [user_service_1.UserService])
], UserController);
//# sourceMappingURL=user.controller.js.map