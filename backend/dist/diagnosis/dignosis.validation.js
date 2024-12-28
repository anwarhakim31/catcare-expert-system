"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DiagnosisValidation = void 0;
const zod_1 = require("zod");
class DiagnosisValidation {
}
exports.DiagnosisValidation = DiagnosisValidation;
DiagnosisValidation.CREATE = zod_1.z.object({ id: zod_1.z.string().min(1) });
DiagnosisValidation.GETALL = zod_1.z.object({
    search: zod_1.z.string().optional(),
    page: zod_1.z.number().min(1).optional(),
    limit: zod_1.z.number().min(10).max(50).optional(),
    status: zod_1.z.string().min(1).optional(),
});
DiagnosisValidation.PATCH = zod_1.z.object({
    expired: zod_1.z.number().min(0),
    symptoms: zod_1.z.array(zod_1.z.object({
        id: zod_1.z.string().min(1).optional(),
        symptom: zod_1.z.string().min(1).optional(),
        answer: zod_1.z.boolean().optional(),
    })),
    disease: zod_1.z.array(zod_1.z.string().min(1).optional()),
    status: zod_1.z.string().min(1),
});
//# sourceMappingURL=dignosis.validation.js.map