"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthValidation = void 0;
const zod_1 = require("zod");
class AuthValidation {
}
exports.AuthValidation = AuthValidation;
AuthValidation.REGISTER = zod_1.z.object({
    username: zod_1.z.string().min(5).max(100),
    password: zod_1.z.string().min(5).max(100),
    fullname: zod_1.z.string().min(5).max(100),
});
AuthValidation.LOGIN = zod_1.z.object({
    username: zod_1.z.string().min(1).max(100),
    password: zod_1.z.string().min(1).max(100),
});
AuthValidation.UPDATE = zod_1.z.object({
    fullname: zod_1.z.string().min(1).max(100).optional(),
    username: zod_1.z.string().min(1).max(100).optional(),
    password: zod_1.z.string().min(1).max(100).optional(),
});
//# sourceMappingURL=auth.validation.js.map