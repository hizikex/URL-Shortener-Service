import {
  ExceptionFilter,
  Catch,
  ArgumentsHost,
  HttpException,
  HttpStatus,
  Logger,
  Inject,
} from '@nestjs/common';
import { Request, Response } from 'express';
import { WINSTON_MODULE_PROVIDER } from 'nest-winston';
import { Logger as WinstonLogger } from 'winston';

@Catch()
export class GlobalExceptionFilter implements ExceptionFilter {
  private readonly logger = new Logger(GlobalExceptionFilter.name);

  constructor(
    @Inject(WINSTON_MODULE_PROVIDER) private readonly winstonLogger: WinstonLogger,
  ) {}

  catch(exception: unknown, host: ArgumentsHost): void {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();
    const request = ctx.getRequest<Request>();

    let status: number;
    let message: string | object;
    let stack: string;

    if (exception instanceof HttpException) {
      status = exception.getStatus();
      const exceptionResponse = exception.getResponse();
      message = typeof exceptionResponse === 'string' 
        ? exceptionResponse 
        : exceptionResponse;
      stack = exception.stack ?? '';
    } else if (exception instanceof Error) {
      status = HttpStatus.INTERNAL_SERVER_ERROR;
      message = exception.message || 'Internal server error';
      stack = exception.stack ?? '';
    } else {
      status = HttpStatus.INTERNAL_SERVER_ERROR;
      message = 'Unknown error occurred';
      stack = String(exception);
    }

    const errorResponse = {
      statusCode: status,
      timestamp: new Date().toISOString(),
      path: request.url,
      method: request.method,
      message,
    };

    // Log the exception
    const logContext = {
      method: request.method,
      url: request.url,
      statusCode: status,
      userAgent: request.headers['user-agent'],
      ip: request.ip,
      message,
      stack,
    };

    if (status >= 500) {
      this.logger.error(`Internal Server Error: ${message}`, logContext);
      this.winstonLogger.error('Unhandled Exception', {
        ...logContext,
        severity: 'high',
        exception: exception instanceof Error ? exception.name : 'Unknown',
      });
    } else if (status >= 400) {
      this.logger.warn(`Client Error: ${message}`, logContext);
      this.winstonLogger.warn('Client Error', {
        ...logContext,
        severity: 'medium',
      });
    } else {
      this.logger.log(`HTTP Exception: ${message}`, logContext);
      this.winstonLogger.info('HTTP Exception', logContext);
    }

    response.status(status).json(errorResponse);
  }
}