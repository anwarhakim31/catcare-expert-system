"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthService = void 0;
const common_1 = require("@nestjs/common");
const bcrypt = __importStar(require("bcrypt"));
const validation_service_1 = require("../common/validation.service");
const prisma_service_1 = require("../common/prisma.service");
const auth_validation_1 = require("./auth.validation");
let AuthService = class AuthService {
    constructor(validationService, prismaService) {
        this.validationService = validationService;
        this.prismaService = prismaService;
    }
    async register(request) {
        const registerRequest = this.validationService.validate(auth_validation_1.AuthValidation.REGISTER, request);
        const totalUserWithSameUsername = await this.prismaService.user.count({
            where: {
                username: registerRequest.username,
            },
        });
        if (totalUserWithSameUsername != 0) {
            throw new common_1.HttpException('Nama pengguna sudah digunakan', 400);
        }
        registerRequest.password = await bcrypt.hash(registerRequest.password, 10);
        const user = await this.prismaService.user.create({
            data: registerRequest,
        });
        return {
            username: user.username,
            fullname: user.fullname,
            photo: user.photo,
            isAdmin: user.isAdmin,
        };
    }
    async login(request) {
        try {
            const LoginRequest = this.validationService.validate(auth_validation_1.AuthValidation.LOGIN, request);
            const user = await this.prismaService.user.findUnique({
                where: {
                    username: LoginRequest.username,
                },
            });
            if (!user) {
                throw new common_1.HttpException('Nama pengguna atau kata sandi salah', 401);
            }
            const isPasswordValid = await bcrypt.compare(LoginRequest.password, user.password);
            if (!isPasswordValid) {
                throw new common_1.HttpException('Nama pengguna atau kata sandi salah', 401);
            }
            return {
                username: user.username,
                fullname: user.fullname,
                photo: user?.photo || null,
                isAdmin: user.isAdmin,
            };
        }
        catch (error) {
            console.log(error);
        }
    }
    async update(request) {
        const UpdateRequest = this.validationService.validate(auth_validation_1.AuthValidation.UPDATE, request);
        console.log(UpdateRequest);
        const isMatch = await this.prismaService.user.findFirst({
            where: {
                username: UpdateRequest.username,
                fullname: UpdateRequest.fullname,
            },
        });
        if (!isMatch) {
            throw new common_1.HttpException('Akun tidak ditemukan', 404);
        }
        const gentSalt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(UpdateRequest.password, gentSalt);
        const user = await this.prismaService.user.update({
            where: {
                username: UpdateRequest.username,
            },
            data: {
                password: hashedPassword,
            },
        });
        return {
            username: user.username,
            fullname: user.fullname,
        };
    }
    async get(user) {
        const userData = this.prismaService.user.findUnique({
            where: {
                username: user.username,
            },
        });
        return userData;
    }
};
exports.AuthService = AuthService;
exports.AuthService = AuthService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [validation_service_1.ValidationService,
        prisma_service_1.PrismaService])
], AuthService);
//# sourceMappingURL=auth.service.js.map