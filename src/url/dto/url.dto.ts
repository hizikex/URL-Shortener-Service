import { IsDate, IsNotEmpty, IsNumber, IsOptional, IsString } from 'class-validator';
import { Type } from 'class-transformer';

export class UrlCreationDto {
    @IsString()
    @IsNotEmpty()
    originalUrl: string;

    // @IsString()
    // @IsNotEmpty()
    // shortCode: string;

    @IsOptional()
    @Type(() => Date)
    @IsDate()
    expiresAt: Date;

    @IsOptional()
    @IsNumber()
    clickCount: number;
}

export class UrlUpdateDto {
    @IsString()
    @IsOptional()
    originalUrl: string;

    @IsOptional()
    @Type(() => Date)
    @IsDate()
    expiresAt: Date;

    @IsOptional()
    @IsNumber()
    clickCount: number;
}
