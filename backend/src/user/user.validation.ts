import { z, ZodType } from 'zod';

export class UserValidation {
  static readonly GETALL: ZodType = z.object({
    search: z.string().optional(),
    page: z.number().min(1).optional(),
    limit: z.number().min(10).optional(),
  });

  static readonly PUT: ZodType = z.object({
    fullname: z.string().min(1),
    username: z.string().min(1),
    password: z.string().optional(),
    photo: z.string().optional(),
  });

  static readonly EditProfie: ZodType = z.object({
    fullname: z.string().min(1),
    username: z.string().min(1),
    photo: z.string().optional(),
  });
  static readonly ChangePassword: ZodType = z.object({
    password: z.string().min(1),
    newPassword: z.string().min(1),
  });
}
