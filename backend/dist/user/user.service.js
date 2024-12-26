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
exports.UserService = void 0;
const common_1 = require("@nestjs/common");
const prisma_service_1 = require("../common/prisma.service");
const validation_service_1 = require("../common/validation.service");
const user_validation_1 = require("./user.validation");
const bcrypt = __importStar(require("bcrypt"));
let UserService = class UserService {
    constructor(validationService, prismaService) {
        this.validationService = validationService;
        this.prismaService = prismaService;
    }
    async getAll(request) {
        const getReq = this.validationService.validate(user_validation_1.UserValidation.GETALL, request);
        const filter = [];
        if (getReq.search) {
            filter.push({
                fullname: {
                    contains: getReq.search,
                },
                username: {
                    contains: getReq.search,
                },
            });
        }
        const user = await this.prismaService.user.findMany({
            where: {
                AND: filter,
                isAdmin: false,
            },
            skip: (getReq.page - 1) * getReq.limit,
            take: getReq.limit,
            orderBy: {
                createdAt: 'desc',
            },
            select: {
                username: true,
                fullname: true,
                createdAt: true,
                photo: true,
            },
        });
        const total = await this.prismaService.user.count({
            where: {
                AND: filter,
            },
        });
        return {
            data: user,
            paging: {
                limit: getReq.limit,
                totalPage: Math.ceil(total / getReq.limit),
                page: getReq.page,
                total: total,
            },
        };
    }
    async delete(request) {
        const disease = await this.prismaService.user.deleteMany({
            where: {
                username: {
                    in: request.selected,
                },
            },
        });
        if (disease.count == 0 || disease.count < request.selected.length) {
            throw new common_1.HttpException('pengguna tidak ditemukan', 404);
        }
        await this.prismaService.diagnosis.deleteMany({
            where: {
                username: {
                    in: request.selected,
                },
            },
        });
        return disease;
    }
    async put(request) {
        const penggunaReq = this.validationService.validate(user_validation_1.UserValidation.PUT, request);
        const user = await this.prismaService.user.update({
            where: {
                username: penggunaReq.username,
            },
            data: {
                fullname: penggunaReq.fullname,
                photo: penggunaReq.photo,
            },
        });
        if (penggunaReq.password) {
            const salt = await bcrypt.genSalt();
            penggunaReq.password = await bcrypt.hash(penggunaReq.password, salt);
            await this.prismaService.user.update({
                where: {
                    username: penggunaReq.username,
                },
                data: {
                    password: penggunaReq.password,
                },
            });
        }
        return user;
    }
    async editProfile(request) {
        const RequestEdit = this.validationService.validate(user_validation_1.UserValidation.EditProfie, request);
        const user = await this.prismaService.user.update({
            where: {
                username: RequestEdit.username,
            },
            data: {
                fullname: RequestEdit.fullname,
                photo: RequestEdit.photo,
            },
        });
        return {
            username: user.username,
            fullname: user.fullname,
            photo: user.photo,
            isAdmin: user.isAdmin,
        };
    }
    async changePassword(username, request) {
        const EditRequest = this.validationService.validate(user_validation_1.UserValidation.ChangePassword, request);
        const user = await this.prismaService.user.findUnique({
            where: {
                username: username,
            },
        });
        if (!user) {
            throw new common_1.HttpException('Akun tidak ditemukan', 404);
        }
        const isPasswordValid = await bcrypt.compare(EditRequest.password, user.password);
        if (!isPasswordValid) {
            throw new common_1.HttpException('Password lama salah', 400);
        }
        const gensalt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(EditRequest.newPassword, gensalt);
        const updated = await this.prismaService.user.update({
            where: {
                username: username,
            },
            data: {
                password: hashedPassword,
            },
        });
        return {
            username: updated.username,
            fullname: updated.fullname,
            photo: updated?.photo || null,
            isAdmin: updated.isAdmin,
        };
    }
};
exports.UserService = UserService;
exports.UserService = UserService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [validation_service_1.ValidationService,
        prisma_service_1.PrismaService])
], UserService);
//# sourceMappingURL=user.service.js.map