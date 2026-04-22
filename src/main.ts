import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe, Logger } from '@nestjs/common';
import { WINSTON_MODULE_NEST_PROVIDER } from 'nest-winston';
import { LoggingInterceptor } from './interceptors/logging.interceptor';
import { GlobalExceptionFilter } from './filters/global-exception.filter';

async function bootstrap() {
  const app = await NestFactory.create(AppModule, {
    logger: false, // Disable default NestJS logger
  });
  
  // Use Winston logger
  app.useLogger(app.get(WINSTON_MODULE_NEST_PROVIDER));
  
  // Global interceptors and filters
  app.useGlobalInterceptors(app.get(LoggingInterceptor));
  app.useGlobalFilters(app.get(GlobalExceptionFilter));
  
  app.useGlobalPipes(new ValidationPipe());
  app.setGlobalPrefix('api/v1');
  
  const port = process.env.PORT ?? 3000;
  await app.listen(port);
  
  const logger = new Logger('Bootstrap');
  logger.log(`🚀 Application is running on port ${port}`);
}

bootstrap().catch((error) => {
  const logger = new Logger('Bootstrap');
  logger.error('Failed to start application', error);
  process.exit(1);
});
