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
exports.AuthController = void 0;
const common_1 = require("@nestjs/common");
const auth_service_1 = require("./auth.service");
const auth_model_1 = require("../model/auth.model");
const jwt_1 = require("@nestjs/jwt");
const authGuard_1 = require("../guards/authGuard");
let AuthController = class AuthController {
    constructor(authService, JwtService) {
        this.authService = authService;
        this.JwtService = JwtService;
        this.generateToken = (payload) => {
            return this.JwtService.sign(payload);
        };
    }
    async register(request, response) {
        const result = await this.authService.register(request);
        const token = this.generateToken(result);
        response.cookie('catcare', token, {
            secure: true,
            httpOnly: true,
            maxAge: 1 * 60 * 60 * 1000,
            sameSite: 'none',
        });
        response.json({
            success: true,
            message: 'Berhasil login',
            data: result,
        });
    }
    async login(request, response) {
        const result = await this.authService.login(request);
        const token = this.generateToken(result);
        response.cookie('catcare', token, {
            secure: true,
            httpOnly: true,
            maxAge: 8 * 60 * 60 * 1000,
            sameSite: 'none',
        });
        response.json({
            success: true,
            message: 'Berhasil login',
            data: result,
        });
    }
    async update(request) {
        await this.authService.update(request);
        return {
            success: true,
            message: 'Berhasil mengganti kata sandi',
        };
    }
    async get(req, res) {
        const user = req['user'];
        const result = await this.authService.get(user);
        res.json({
            success: true,
            message: 'Berhasil mengambil data ',
            data: result,
        });
    }
    async delete(res) {
        res.clearCookie('catcare');
        res.json({
            success: true,
            message: 'Berhasil logout',
        });
    }
};
exports.AuthController = AuthController;
__decorate([
    (0, common_1.Post)('/register'),
    __param(0, (0, common_1.Body)()),
    __param(1, (0, common_1.Res)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [auth_model_1.RegisterRequest, Object]),
    __metadata("design:returntype", Promise)
], AuthController.prototype, "register", null);
__decorate([
    (0, common_1.Post)('/login'),
    __param(0, (0, common_1.Body)()),
    __param(1, (0, common_1.Res)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [auth_model_1.LoginRequest, Object]),
    __metadata("design:returntype", Promise)
], AuthController.prototype, "login", null);
__decorate([
    (0, common_1.Patch)('/forget-password'),
    (0, common_1.HttpCode)(200),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [auth_model_1.UpdateRequest]),
    __metadata("design:returntype", Promise)
], AuthController.prototype, "update", null);
__decorate([
    (0, common_1.Get)('/current'),
    (0, common_1.UseGuards)(authGuard_1.AuthGuard),
    (0, common_1.HttpCode)(200),
    __param(0, (0, common_1.Req)()),
    __param(1, (0, common_1.Res)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", Promise)
], AuthController.prototype, "get", null);
__decorate([
    (0, common_1.Delete)('/logout'),
    (0, common_1.HttpCode)(200),
    __param(0, (0, common_1.Res)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], AuthController.prototype, "delete", null);
exports.AuthController = AuthController = __decorate([
    (0, common_1.Controller)('api/auth'),
    __metadata("design:paramtypes", [auth_service_1.AuthService,
        jwt_1.JwtService])
], AuthController);
//# sourceMappingURL=auth.controller.js.map