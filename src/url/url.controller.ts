import { Body, Controller, Get, Param, Patch, Post, Query, ValidationPipe } from '@nestjs/common';
import { UrlService } from './url.service';
import { Url } from './url.model';
import { UrlCreationDto, UrlUpdateDto } from './dto/url.dto';

@Controller('urls')
export class UrlController {
    constructor(private readonly urlService: UrlService) {}

    @Post()
    create(@Body(ValidationPipe) urlCreationDto: UrlCreationDto): Promise<Url> {
        return this.urlService.create(urlCreationDto);
    }

    @Get()
    findAll(@Query() filter?: Partial<UrlCreationDto>): Promise<Url[]> {
        return this.urlService.findAll(filter);
    }

    @Get(':code')
    findOne(@Param('code') shortCode: string): Promise<Url | null> {
        return this.urlService.findByShortCode(shortCode);
    }

    @Patch(':code')
    update(@Param('code') shortCode: string, @Body(ValidationPipe) urlUpdateDto: UrlUpdateDto): Promise<Url | null> {
        return this.urlService.update(shortCode, urlUpdateDto);
    }
}
