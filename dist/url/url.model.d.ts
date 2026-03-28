import { Model } from 'sequelize-typescript';
export declare class Url extends Model<Url> {
    originalUrl: string;
    shortCode: string;
    expiresAt: Date;
    clickCount: number;
}
