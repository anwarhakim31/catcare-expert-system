"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserValidation = void 0;
const zod_1 = require("zod");
class UserValidation {
}
exports.UserValidation = UserValidation;
UserValidation.GETALL = zod_1.z.object({
    search: zod_1.z.string().optional(),
    page: zod_1.z.number().min(1).optional(),
    limit: zod_1.z.number().min(10).optional(),
});
UserValidation.PUT = zod_1.z.object({
    fullname: zod_1.z.string().min(1),
    username: zod_1.z.string().min(1),
    password: zod_1.z.string().optional(),
    photo: zod_1.z.string().optional(),
});
UserValidation.EditProfie = zod_1.z.object({
    fullname: zod_1.z.string().min(1),
    username: zod_1.z.string().min(1),
    photo: zod_1.z.string().optional(),
});
UserValidation.ChangePassword = zod_1.z.object({
    password: zod_1.z.string().min(1),
    newPassword: zod_1.z.string().min(1),
});
//# sourceMappingURL=user.validation.js.map