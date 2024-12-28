"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PenyakitValidation = void 0;
const zod_1 = require("zod");
class PenyakitValidation {
}
exports.PenyakitValidation = PenyakitValidation;
PenyakitValidation.CREATE = zod_1.z.object({
    id: zod_1.z.string().min(1),
    name: zod_1.z.string().min(1),
    image: zod_1.z.string().min(1),
    description: zod_1.z.string().min(1),
    solution: zod_1.z.string().min(1),
});
PenyakitValidation.GETALL = zod_1.z.object({
    search: zod_1.z.string().optional(),
    page: zod_1.z.number().min(1).optional(),
    limit: zod_1.z.number().min(10).optional(),
});
PenyakitValidation.GET = zod_1.z.object({
    id: zod_1.z.string().min(1),
});
PenyakitValidation.PUT = zod_1.z.object({
    id: zod_1.z.string().min(1),
    name: zod_1.z.string().min(1),
    image: zod_1.z.string().min(1),
    description: zod_1.z.string().min(1),
    solution: zod_1.z.string().min(1),
});
//# sourceMappingURL=penyakit.validation.js.map