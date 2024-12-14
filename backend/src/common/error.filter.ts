import {
  ArgumentsHost,
  Catch,
  ExceptionFilter,
  HttpException,
} from '@nestjs/common';
import { ZodError } from 'zod';

@Catch(ZodError, HttpException)
export class ErrorFilter implements ExceptionFilter {
  catch(exception: any, host: ArgumentsHost) {
    const response = host.switchToHttp().getResponse();

    if (exception instanceof HttpException) {
      response.status(exception.getStatus()).json({
        success: false,
        code: exception.getStatus(),
        message: exception.message,
      });
    } else if (exception instanceof ZodError) {
      response.status(400).json({
        success: false,
        code: 400,
        errors: exception.errors,
        message: 'validation failed',
      });
    } else {
      response.status(500).json({
        success: false,
        code: 500,
        message: exception.message,
      });
    }
  }
}
