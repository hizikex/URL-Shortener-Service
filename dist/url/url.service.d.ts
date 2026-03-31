import { Url } from './url.model';
import { UrlCreationDto } from './dto/create-url.dto';
import { UrlRepository } from '../repository/url.repository';
export interface UrlCreationAttributes {
    urlData: Url;
    shortUrl: string;
}
export declare class UrlService {
    private readonly urlRepository;
    constructor(urlRepository: UrlRepository);
    private generateShortCode;
    create(urlCreationDto: UrlCreationDto): Promise<UrlCreationAttributes>;
    findAll(filter?: Partial<UrlCreationDto>): Promise<Url[]>;
    findOne(shortCode: string): Promise<Url | null>;
    findByShortCode(shortCode: string): Promise<Url | null>;
    update(id: string, urlCreationDto: UrlCreationDto): Promise<Url | null>;
    incrementClickCount(id: string): Promise<Url | null>;
    remove(id: string): Promise<void>;
}
