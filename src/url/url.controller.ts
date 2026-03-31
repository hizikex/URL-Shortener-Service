import { Body, Controller, Get, Param, Post, Query, ValidationPipe } from '@nestjs/common';
import { UrlCreationAttributes, UrlService } from './url.service';
import { Validate } from 'sequelize-typescript';
import { Url } from './url.model';
import { UrlCreationDto } from './dto/create-url.dto';

@Controller('urls')
export class UrlController {
    constructor(private readonly urlService: UrlService) {}

    @Post()
    create(@Body(ValidationPipe) urlCreationDto: UrlCreationDto): Promise<UrlCreationAttributes> {
        return this.urlService.create(urlCreationDto);
    }

    @Get()
    findAll(@Query() filter?: Partial<UrlCreationDto>): Promise<Url[]> {
        return this.urlService.findAll(filter);
    }

    @Get(':code')
    findOne(@Param('code') shortCode: string): Promise<Url | null> {
        return this.urlService.findOne(shortCode);
    }


}
