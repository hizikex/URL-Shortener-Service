import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { Url } from './url.model';

@Injectable()
export class UrlService {
  constructor(
    @InjectModel(Url)
    private urlModel: typeof Url,
  ) {}

  async findAll(): Promise<Url[]> {
    return this.urlModel.findAll();
  }

  findOne(id: string): Promise<Url | null> {
    return this.urlModel.findOne({
      where: {
        id,
      },
    });
  }

  async remove(id: string): Promise<void> {
    const url = await this.findOne(id);
    if (url) {
      await url.destroy();
    }
  }
}
