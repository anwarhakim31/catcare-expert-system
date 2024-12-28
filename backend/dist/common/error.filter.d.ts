import { ArgumentsHost, ExceptionFilter } from '@nestjs/common';
export declare class ErrorFilter implements ExceptionFilter {
    catch(exception: any, host: ArgumentsHost): void;
}
