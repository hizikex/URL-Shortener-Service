import { Module } from '@nestjs/common';
import { UrlService } from './url.service';
import { UrlController } from './url.controller';
import { Url } from 'src/url/url.model';
import { SequelizeModule } from '@nestjs/sequelize';
import { UrlRepository } from '../repository/url.repository';

@Module({
  imports: [SequelizeModule.forFeature([Url])],
  providers: [UrlService, UrlRepository],
  controllers: [UrlController],
  exports: [SequelizeModule, UrlRepository],
})
export class UrlModule {}
