"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UrlService = void 0;
const common_1 = require("@nestjs/common");
const url_repository_1 = require("../repository/url.repository");
let UrlService = class UrlService {
    urlRepository;
    constructor(urlRepository) {
        this.urlRepository = urlRepository;
    }
    generateShortCode() {
        const timestamp = Date.now().toString(36).toUpperCase();
        const random = Math.random().toString(36).substring(2, 6).toUpperCase();
        return `${timestamp}-${random}`;
    }
    async create(urlCreationDto) {
        const { originalUrl, expiresAt, clickCount } = urlCreationDto;
        const existingUrl = await this.urlRepository.fetchUrl({ originalUrl });
        if (existingUrl) {
            throw new common_1.ConflictException('URL already exists');
        }
        let shortCode = this.generateShortCode();
        let shortCodeExists = await this.urlRepository.fetchUrl({ shortCode });
        while (shortCodeExists) {
            shortCode = this.generateShortCode();
            shortCodeExists = await this.urlRepository.fetchUrl({ shortCode });
        }
        return this.urlRepository.createUrl({
            originalUrl,
            shortCode,
            expiresAt,
            clickCount
        });
    }
    async findAll(filter) {
        return this.urlRepository.fetchAllUrls(filter);
    }
    async findOne(shortCode) {
        const url = await this.urlRepository.fetchUrl({ shortCode });
        if (!url) {
            throw new common_1.NotFoundException('URL not found');
        }
        const clickCount = url.clickCount + 1;
        await this.urlRepository.updateUrl(url.id, { clickCount });
        return url;
    }
    async findByShortCode(shortCode) {
        return this.urlRepository.fetchUrl({ shortCode });
    }
    async update(id, urlCreationDto) {
        const url = await this.findOne(id);
        if (!url) {
            return null;
        }
        const { originalUrl, expiresAt, clickCount } = urlCreationDto;
        url.originalUrl = originalUrl;
        url.expiresAt = expiresAt;
        url.clickCount = clickCount;
        await this.urlRepository.save(url);
        return url;
    }
    async incrementClickCount(id) {
        const url = await this.findOne(id);
        if (!url) {
            return null;
        }
        url.clickCount += 1;
        await this.urlRepository.save(url);
        return url;
    }
    async remove(id) {
        const url = await this.findOne(id);
        if (url) {
            await this.urlRepository.destroy({ where: { id } });
        }
    }
};
exports.UrlService = UrlService;
exports.UrlService = UrlService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [url_repository_1.UrlRepository])
], UrlService);
//# sourceMappingURL=url.service.js.map