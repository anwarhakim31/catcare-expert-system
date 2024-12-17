import { z, ZodType } from 'zod';

export class PenyakitValidation {
  static readonly CREATE: ZodType = z.object({
    name: z.string().min(1),
    image: z.string().min(1),
    description: z.string().min(1),
    solution: z.string().min(1),
  });

  static readonly GETALL: ZodType = z.object({
    search: z.string().optional(),
    page: z.number().optional(),
    limit: z.number().optional(),
  });

  static readonly GET: ZodType = z.object({
    id: z.string().min(1),
  });

  static readonly PUT: ZodType = z.object({
    name: z.string().min(1),
    image: z.string().min(1),
    description: z.string().min(1),
    solution: z.string().min(1),
  });
}
