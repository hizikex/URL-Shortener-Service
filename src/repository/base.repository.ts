import { Model, ModelCtor } from 'sequelize-typescript';
import {
  FindOptions,
  CreateOptions,
  UpdateOptions,
  DestroyOptions,
  BulkCreateOptions,
  CountOptions,
  GroupedCountResultItem
} from 'sequelize';


export class BaseRepository<T extends Model> {
  constructor(protected readonly model: ModelCtor<T>) {}

  async create(payload: Partial<T>, options?: CreateOptions): Promise<T> {
    return this.model.create(payload as any, options);
  }

  async bulkCreate(payload: Partial<T>[], options?: BulkCreateOptions): Promise<T[]> {
    return this.model.bulkCreate(payload as any, options);
  }

  async findByPk(id: number | string, options?: FindOptions): Promise<T | null> {
    return this.model.findByPk(id, options);
  }

  async findOne(options: FindOptions): Promise<T | null> {
    return this.model.findOne(options);
  }

  async findAll(options?: FindOptions): Promise<T[]> {
    return this.model.findAll(options);
  }

  async update(values: Partial<T>, options: UpdateOptions): Promise<[affectedCount: number]> {
    return this.model.update(values as any, options);
  }

  async destroy(options: DestroyOptions): Promise<number> {
    return this.model.destroy(options);
  }

  async count(options?: CountOptions): Promise<number | GroupedCountResultItem[]> {
    return this.model.count(options);
  }

  async save(instance: T, options?: CreateOptions): Promise<T> {
    return instance.save(options);
  }
}
