import {
  Table,
  Column,
  Model,
  DataType,
} from 'sequelize-typescript';

@Table({
  tableName: 'urls',
})
export class Url extends Model<Url> {
  @Column({
    allowNull: false,
  })
  originalUrl: string;

  @Column({
    unique: true,
  })
  shortCode: string;

  @Column({
    allowNull: true,
  })
  expiresAt: Date;

  @Column({
    defaultValue: 0,
  })
  clickCount: number;
}
