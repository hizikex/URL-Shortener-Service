import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import { Url } from './url/url.model';
import { UrlModule } from './url/url.module';

@Module({
  imports: [
    SequelizeModule.forRoot({
      dialect: 'mysql',
      host: 'localhost',
      port: 3306,
      username: 'root',
      password: 'root',
      database: 'url_shortner_service',
      models: [Url],
      autoLoadModels: true,
      synchronize: true,
    }),
  ],
})

@Module({
  imports: [AuthModule, UrlModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
