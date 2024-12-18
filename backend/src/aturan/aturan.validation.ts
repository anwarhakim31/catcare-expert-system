import { z, ZodType } from 'zod';

export class AturanValidation {
  static readonly CREATE: ZodType = z.object({
    diseaseId: z.string().min(1),
    symptomId: z.string().min(1),
  });
  static readonly GETALL: ZodType = z.object({
    search: z.string().optional(),
    page: z.number().min(1).optional(),
    limit: z.number().min(10).optional(),
  });
  static readonly GET: ZodType = z.object({
    id: z.string().min(1),
  });
  static readonly PUT: ZodType = z.object({
    diseaseId: z.string().min(1),
    symptomId: z.string().min(1),
  });
}
