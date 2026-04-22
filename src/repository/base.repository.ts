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
import { Logger } from '@nestjs/common';

export class BaseRepository<T extends Model> {
  protected readonly logger = new Logger(BaseRepository.name);

  constructor(protected readonly model: ModelCtor<T>) {}

  async create(payload: Partial<T>, options?: CreateOptions): Promise<T> {
    const startTime = Date.now();
    this.logger.debug(`Creating ${this.model.name}`, { payload });

    try {
      const result = await this.model.create(payload as any, options);
      const duration = Date.now() - startTime;

      this.logger.debug(`${this.model.name} created successfully`, {
        id: (result as any).id,
        duration: `${duration}ms`,
      });

      return result;
    } catch (error) {
      const duration = Date.now() - startTime;
      this.logger.error(`Failed to create ${this.model.name}`, {
        payload,
        error: error.message,
        duration: `${duration}ms`,
      });
      throw error;
    }
  }

  async bulkCreate(payload: Partial<T>[], options?: BulkCreateOptions): Promise<T[]> {
    const startTime = Date.now();
    this.logger.debug(`Bulk creating ${payload.length} ${this.model.name} records`);

    try {
      const result = await this.model.bulkCreate(payload as any, options);
      const duration = Date.now() - startTime;

      this.logger.debug(`Bulk created ${result.length} ${this.model.name} records`, {
        count: result.length,
        duration: `${duration}ms`,
      });

      return result;
    } catch (error) {
      const duration = Date.now() - startTime;
      this.logger.error(`Failed to bulk create ${this.model.name}`, {
        count: payload.length,
        error: error.message,
        duration: `${duration}ms`,
      });
      throw error;
    }
  }

  async findByPk(id: number | string, options?: FindOptions): Promise<T | null> {
    const startTime = Date.now();
    this.logger.debug(`Finding ${this.model.name} by primary key`, { id });

    try {
      const result = await this.model.findByPk(id, options);
      const duration = Date.now() - startTime;

      this.logger.debug(`${this.model.name} findByPk completed`, {
        id,
        found: !!result,
        duration: `${duration}ms`,
      });

      return result;
    } catch (error) {
      const duration = Date.now() - startTime;
      this.logger.error(`Failed to find ${this.model.name} by primary key`, {
        id,
        error: error.message,
        duration: `${duration}ms`,
      });
      throw error;
    }
  }

  async findOne(options: FindOptions): Promise<T | null> {
    const startTime = Date.now();
    this.logger.debug(`Finding one ${this.model.name}`, { options: this.sanitizeOptions(options) });

    try {
      const result = await this.model.findOne(options);
      const duration = Date.now() - startTime;

      this.logger.debug(`${this.model.name} findOne completed`, {
        found: !!result,
        duration: `${duration}ms`,
      });

      return result;
    } catch (error) {
      const duration = Date.now() - startTime;
      this.logger.error(`Failed to find one ${this.model.name}`, {
        options: this.sanitizeOptions(options),
        error: error.message,
        duration: `${duration}ms`,
      });
      throw error;
    }
  }

  async findAll(options?: FindOptions): Promise<T[]> {
    const startTime = Date.now();
    this.logger.debug(`Finding all ${this.model.name}`, { options: this.sanitizeOptions(options) });

    try {
      const result = await this.model.findAll(options);
      const duration = Date.now() - startTime;

      this.logger.debug(`${this.model.name} findAll completed`, {
        count: result.length,
        duration: `${duration}ms`,
      });

      return result;
    } catch (error) {
      const duration = Date.now() - startTime;
      this.logger.error(`Failed to find all ${this.model.name}`, {
        options: this.sanitizeOptions(options),
        error: error.message,
        duration: `${duration}ms`,
      });
      throw error;
    }
  }

  async update(values: Partial<T>, options: UpdateOptions): Promise<[affectedCount: number]> {
    const startTime = Date.now();
    this.logger.debug(`Updating ${this.model.name}`, { 
      values, 
      options: this.sanitizeOptions(options) 
    });

    try {
      const result = await this.model.update(values as any, options);
      const duration = Date.now() - startTime;

      this.logger.debug(`${this.model.name} update completed`, {
        affectedRows: result[0],
        duration: `${duration}ms`,
      });

      return result;
    } catch (error) {
      const duration = Date.now() - startTime;
      this.logger.error(`Failed to update ${this.model.name}`, {
        values,
        options: this.sanitizeOptions(options),
        error: error.message,
        duration: `${duration}ms`,
      });
      throw error;
    }
  }

  async destroy(options: DestroyOptions): Promise<number> {
    const startTime = Date.now();
    this.logger.debug(`Destroying ${this.model.name}`, { options: this.sanitizeOptions(options) });

    try {
      const result = await this.model.destroy(options);
      const duration = Date.now() - startTime;

      this.logger.debug(`${this.model.name} destroy completed`, {
        affectedRows: result,
        duration: `${duration}ms`,
      });

      return result;
    } catch (error) {
      const duration = Date.now() - startTime;
      this.logger.error(`Failed to destroy ${this.model.name}`, {
        options: this.sanitizeOptions(options),
        error: error.message,
        duration: `${duration}ms`,
      });
      throw error;
    }
  }

  async count(options?: CountOptions): Promise<number | GroupedCountResultItem[]> {
    const startTime = Date.now();
    this.logger.debug(`Counting ${this.model.name}`, { options: this.sanitizeOptions(options) });

    try {
      const result = await this.model.count(options);
      const duration = Date.now() - startTime;

      this.logger.debug(`${this.model.name} count completed`, {
        count: result,
        duration: `${duration}ms`,
      });

      return result;
    } catch (error) {
      const duration = Date.now() - startTime;
      this.logger.error(`Failed to count ${this.model.name}`, {
        options: this.sanitizeOptions(options),
        error: error.message,
        duration: `${duration}ms`,
      });
      throw error;
    }
  }

  async save(instance: T, options?: CreateOptions): Promise<T> {
    const startTime = Date.now();
    this.logger.debug(`Saving ${this.model.name} instance`, { 
      id: (instance as any).id 
    });

    try {
      const result = await instance.save(options);
      const duration = Date.now() - startTime;

      this.logger.debug(`${this.model.name} instance saved successfully`, {
        id: (result as any).id,
        duration: `${duration}ms`,
      });

      return result;
    } catch (error) {
      const duration = Date.now() - startTime;
      this.logger.error(`Failed to save ${this.model.name} instance`, {
        id: (instance as any).id,
        error: error.message,
        duration: `${duration}ms`,
      });
      throw error;
    }
  }

  /**
   * Sanitize options for logging to avoid logging sensitive data
   * and reduce log verbosity
   */
  private sanitizeOptions(options: any): any {
    if (!options) return options;

    // Create a shallow copy and remove potentially sensitive or verbose fields
    const sanitized = { ...options };
    
    // Remove potentially sensitive authentication or raw query data
    delete sanitized.raw;
    delete sanitized.mapToModel;
    delete sanitized.nest;
    delete sanitized.plain;
    
    return sanitized;
  }
}
