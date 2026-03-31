import { Transaction } from 'sequelize';
import { Url } from '../url/url.model';
import { BaseRepository } from './base.repository';
import { InjectModel } from '@nestjs/sequelize';

export class UrlRepository extends BaseRepository<Url> {
  constructor(
    @InjectModel(Url)
    urlModel: typeof Url
  ) {
    super(urlModel);
  }
  async createUrl(payload: Partial<Url>, options?: any): Promise<Url> {
    return this.create(payload, options);
  }

  async fetchUrl(params: Partial<Url>): Promise<Url | null> {
    return this.findOne({ where: params });
  }

  async fetchAllUrls(filter?: Partial<Url>): Promise<Url[]> {
    const urls = await this.findAll(filter ? { where: filter } : undefined);
    return urls;
  }

  async updateUrl(
    id: number,
    payload: Partial<Url>,
    transaction?: Transaction
  ): Promise<boolean> {
    const [affectedRows] = await this.update(payload, {
      where: { id },
      transaction
    });

    return affectedRows > 0;
  }
}
