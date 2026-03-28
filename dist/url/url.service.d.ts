import { Url } from './url.model';
export declare class UrlService {
    private urlModel;
    constructor(urlModel: typeof Url);
    findAll(): Promise<Url[]>;
    findOne(id: string): Promise<Url | null>;
    remove(id: string): Promise<void>;
}
