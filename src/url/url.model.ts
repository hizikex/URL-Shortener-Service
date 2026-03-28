import { Column, Model, Table } from 'sequelize-typescript';

@Table
export class Url extends Model {
  @Column
  originalUrl: string;

  @Column({ unique: true })
  shortCode: string;

  @Column({ defaultValue: () => new Date(Date.now() + 24 * 60 * 60 * 1000) })
  expiresAt: Date;

  @Column({ defaultValue: 0 })
  clickCount: number;
}
