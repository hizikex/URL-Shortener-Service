import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import databaseConfig from './config/database.config';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import { Url } from './url/url.model';
import { UrlModule } from './url/url.module';
import { LoggerModule } from './logger/logger.module';
import { LoggingInterceptor } from './interceptors/logging.interceptor';
import { GlobalExceptionFilter } from './filters/global-exception.filter';

@Module({
  imports: [
    LoggerModule,
    SequelizeModule.forRoot({
      dialect: 'mysql',
      host: '127.0.0.1',
      port: 3306,
      username: 'root',
      password: 'root',
      database: 'url_shortener_service',
      models: [Url],
      autoLoadModels: true,
      synchronize: true,
    }),
    AuthModule,
    UrlModule,
  ],
  controllers: [AppController],
  providers: [
    AppService,
    LoggingInterceptor,
    GlobalExceptionFilter,
  ],
})
export class AppModule {}
