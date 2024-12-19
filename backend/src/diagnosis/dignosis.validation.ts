import { z, ZodType } from 'zod';

export class DiagnosisValidation {
  static readonly CREATE: ZodType = z.object({ id: z.string().min(1) });
  static readonly GETALL: ZodType = z.object({
    search: z.string().optional(),
    page: z.number().min(1).optional(),
    limit: z.number().min(10).optional(),
  });

  static readonly PATCH: ZodType = z.object({
    expired: z.number().min(0),
    symptoms: z.array(
      z.object({
        id: z.string().min(1).optional(),
        symptom: z.string().min(1).optional(),
        answer: z.boolean().optional(),
      }),
    ),
    disease: z.array(z.string().min(1).optional()),
    status: z.string().min(1),
  });
}
