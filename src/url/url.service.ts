import {
  ConflictException,
  Injectable,
  NotFoundException
} from '@nestjs/common';
import { Url } from './url.model';
import { UrlCreationDto, UrlUpdateDto } from './dto/url.dto';
import { UrlRepository } from '../repository/url.repository';
import { log } from 'node:console';

@Injectable()
export class UrlService {
  constructor(private readonly urlRepository: UrlRepository) {}

  private generateShortCode(): string {
    const timestamp = Date.now().toString(36).toUpperCase();
    const random = Math.random().toString(36).substring(2, 6).toUpperCase();
    return `${timestamp}-${random}`;
  }

  async create(urlCreationDto: UrlCreationDto): Promise<Url> {
    const { originalUrl, expiresAt, clickCount } = urlCreationDto;
    const existingUrl = await this.urlRepository.fetchUrl({ originalUrl });
    if (existingUrl) {
      throw new ConflictException('URL already exists');
    }

    let shortCode = this.generateShortCode();
    let shortCodeExists = await this.urlRepository.fetchUrl({ shortCode });
    while (shortCodeExists) {
      shortCode = this.generateShortCode();
      shortCodeExists = await this.urlRepository.fetchUrl({ shortCode });
    }

    return this.urlRepository.createUrl({
      originalUrl,
      shortCode,
      expiresAt,
      clickCount
    });
  }

  async findAll(filter?: Partial<UrlCreationDto>): Promise<Url[]> {

    return this.urlRepository.fetchAllUrls(filter);
  }

  async findByShortCode(shortCode: string): Promise<Url | null> {
    const url = await this.urlRepository.fetchUrl({ shortCode });
    if (!url) {
      throw new NotFoundException('URL not found');
    }

    const clickCount = url.dataValues.clickCount + 1;
    await this.urlRepository.updateUrl(url.id, { clickCount });
    return url;
  }

  async findOne(shortCode: string): Promise<Url | null> {
    return this.urlRepository.fetchUrl({ shortCode });
  }

  async update(
    id: string,
    urlUpdate: UrlUpdateDto
  ): Promise<Url | null> {
    const url = await this.findOne(id);
    if (!url) {
      return null;
    }

    const { originalUrl, expiresAt, clickCount } = urlUpdate;
    url.dataValues.originalUrl = originalUrl;
    url.dataValues.expiresAt = expiresAt;
    url.dataValues.clickCount = clickCount;

    const a = await this.urlRepository.save(url);
    console.log(a);
    
    return url;
  }

  async remove(id: string): Promise<void> {
    const url = await this.findOne(id);
    if (url) {
      await this.urlRepository.destroy({ where: { id } });
    }
  }
}
