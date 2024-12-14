import { z, ZodType } from 'zod';

export class PenyakitValidation {
  static readonly CREATE: ZodType = z.object({
    name: z.string().min(1),
    image: z.string().min(1),
    description: z.string().min(1),
    solution: z.string().min(1),
  });
}
