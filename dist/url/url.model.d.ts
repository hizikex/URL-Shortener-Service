import { Model } from 'sequelize-typescript';
export declare class Url extends Model {
    originalUrl: string;
    shortCode: string;
    expiresAt: Date;
    clickCount: number;
}
