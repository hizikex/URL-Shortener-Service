import {
  Table,
  Column,
  Model,
  Index,
  DataType,
} from 'sequelize-typescript';

@Table({
  tableName: 'urls',
  timestamps: true
})

export class Url extends Model<Url> {
  @Column({
    type: DataType.STRING(2048),
    allowNull: false
  })
  originalUrl: string;

  @Index
  @Column({
    allowNull: false,
    unique: true
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
