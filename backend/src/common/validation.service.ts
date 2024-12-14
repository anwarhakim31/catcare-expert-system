import { Injectable } from '@nestjs/common';
import { ZodType } from 'zod';

@Injectable()
export class ValidationService {
  validate<T>(ZodType: ZodType<T>, data: T): T {
    return ZodType.parse(data);
  }
}
