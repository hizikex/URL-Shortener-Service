import { Url } from './url.model';
import { UrlCreationDto } from './dto/create-url.dto';
import { UrlRepository } from '../repository/url.repository';
export declare class UrlService {
    private readonly urlRepository;
    constructor(urlRepository: UrlRepository);
    private generateShortCode;
    create(urlCreationDto: UrlCreationDto): Promise<Url>;
    findAll(filter?: Partial<UrlCreationDto>): Promise<Url[]>;
    findOne(shortCode: string): Promise<Url | null>;
    findByShortCode(shortCode: string): Promise<Url | null>;
    update(id: string, urlCreationDto: UrlCreationDto): Promise<Url | null>;
    incrementClickCount(id: string): Promise<Url | null>;
    remove(id: string): Promise<void>;
}
