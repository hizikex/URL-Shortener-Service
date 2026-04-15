import { UrlService } from './url.service';
import { Url } from './url.model';
import { UrlCreationDto } from './dto/create-url.dto';
export declare class UrlController {
    private readonly urlService;
    constructor(urlService: UrlService);
    create(urlCreationDto: UrlCreationDto): Promise<Url>;
    findAll(filter?: Partial<UrlCreationDto>): Promise<Url[]>;
    findOne(shortCode: string): Promise<Url | null>;
}
