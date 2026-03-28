import { Module } from '@nestjs/common';
import { UrlService } from './url.service';
import { UrlController } from './url.controller';
import { Url } from 'src/url/url.model';
import { SequelizeModule } from '@nestjs/sequelize';

@Module({
  imports: [SequelizeModule.forFeature([Url])],
  exports: [SequelizeModule],
  providers: [UrlService],
  controllers: [UrlController]
})
export class UrlModule {}
