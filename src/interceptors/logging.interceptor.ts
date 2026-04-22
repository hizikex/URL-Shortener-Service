import {
  Injectable,
  NestInterceptor,
  ExecutionContext,
  CallHandler,
  Logger,
  Inject,
} from '@nestjs/common';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import { Request, Response } from 'express';
import { WINSTON_MODULE_PROVIDER } from 'nest-winston';
import { Logger as WinstonLogger } from 'winston';

@Injectable()
export class LoggingInterceptor implements NestInterceptor {
  private readonly logger = new Logger(LoggingInterceptor.name);

  constructor(
    @Inject(WINSTON_MODULE_PROVIDER) private readonly winstonLogger: WinstonLogger,
  ) {}

  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    const request = context.switchToHttp().getRequest<Request>();
    const response = context.switchToHttp().getResponse<Response>();
    const { method, originalUrl, ip, headers } = request;
    const userAgent = headers['user-agent'] || '';
    const contentLength = headers['content-length'] || 0;

    const startTime = Date.now();
    const requestId = this.generateRequestId();

    // Log request
    this.logger.log(`Incoming ${method} ${originalUrl}`, {
      method,
      url: originalUrl,
      ip,
      userAgent,
      contentLength,
      requestId,
    });

    this.winstonLogger.info('HTTP Request', {
      requestId,
      method,
      url: originalUrl,
      ip,
      userAgent,
      contentLength: parseInt(contentLength.toString()) || 0,
      timestamp: new Date().toISOString(),
    });

    return next.handle().pipe(
      tap({
        next: (responseBody) => {
          const duration = Date.now() - startTime;
          const { statusCode } = response;

          // Log response
          this.logger.log(`Outgoing ${method} ${originalUrl} - ${statusCode}`, {
            method,
            url: originalUrl,
            statusCode,
            duration: `${duration}ms`,
            requestId,
            responseSize: JSON.stringify(responseBody).length,
          });

          this.winstonLogger.info('HTTP Response', {
            requestId,
            method,
            url: originalUrl,
            statusCode,
            duration,
            responseSize: JSON.stringify(responseBody).length,
            timestamp: new Date().toISOString(),
          });
        },
        error: (error) => {
          const duration = Date.now() - startTime;
          const statusCode = error.status || response.statusCode || 500;

          // Log error response
          this.logger.error(`Error ${method} ${originalUrl} - ${statusCode}`, {
            method,
            url: originalUrl,
            statusCode,
            duration: `${duration}ms`,
            requestId,
            error: error.message,
            stack: error.stack,
          });

          this.winstonLogger.error('HTTP Error Response', {
            requestId,
            method,
            url: originalUrl,
            statusCode,
            duration,
            error: error.message,
            stack: error.stack,
            timestamp: new Date().toISOString(),
          });
        },
      }),
    );
  }

  private generateRequestId(): string {
    return Math.random().toString(36).substring(2, 15) + 
           Math.random().toString(36).substring(2, 15);
  }
}