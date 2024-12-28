"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.GejalaValidation = void 0;
const zod_1 = require("zod");
class GejalaValidation {
}
exports.GejalaValidation = GejalaValidation;
GejalaValidation.CREATE = zod_1.z.object({
    id: zod_1.z.string().min(1),
    symptom: zod_1.z.string().min(1),
});
GejalaValidation.GETALL = zod_1.z.object({
    search: zod_1.z.string().optional(),
    page: zod_1.z.number().min(1).optional(),
    limit: zod_1.z.number().min(10).optional(),
});
GejalaValidation.GET = zod_1.z.object({
    id: zod_1.z.string().min(1),
});
GejalaValidation.PUT = zod_1.z.object({
    id: zod_1.z.string().min(1),
    symptom: zod_1.z.string().min(1),
});
//# sourceMappingURL=gejala.validation.js.map