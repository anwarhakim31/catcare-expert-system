import { ZodType } from 'zod';
export declare class ValidationService {
    validate<T>(ZodType: ZodType<T>, data: T): T;
}
