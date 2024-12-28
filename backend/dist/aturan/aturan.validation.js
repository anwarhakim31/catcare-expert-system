"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AturanValidation = void 0;
const zod_1 = require("zod");
class AturanValidation {
}
exports.AturanValidation = AturanValidation;
AturanValidation.CREATE = zod_1.z.object({
    diseaseId: zod_1.z.string().min(1),
    symptomId: zod_1.z.string().min(1),
});
AturanValidation.GETALL = zod_1.z.object({
    search: zod_1.z.string().optional(),
    page: zod_1.z.number().min(1).optional(),
    limit: zod_1.z.number().min(10).optional(),
});
AturanValidation.GET = zod_1.z.object({
    id: zod_1.z.string().min(1),
});
AturanValidation.PUT = zod_1.z.object({
    diseaseId: zod_1.z.string().min(1),
    symptomId: zod_1.z.string().min(1),
});
//# sourceMappingURL=aturan.validation.js.map