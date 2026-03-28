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
exports.Url = void 0;
const sequelize_typescript_1 = require("sequelize-typescript");
let Url = class Url extends sequelize_typescript_1.Model {
    originalUrl;
    shortCode;
    expiresAt;
    clickCount;
};
exports.Url = Url;
__decorate([
    (0, sequelize_typescript_1.Column)({
        allowNull: false,
    }),
    __metadata("design:type", String)
], Url.prototype, "originalUrl", void 0);
__decorate([
    (0, sequelize_typescript_1.Column)({
        unique: true,
    }),
    __metadata("design:type", String)
], Url.prototype, "shortCode", void 0);
__decorate([
    (0, sequelize_typescript_1.Column)({
        allowNull: true,
    }),
    __metadata("design:type", Date)
], Url.prototype, "expiresAt", void 0);
__decorate([
    (0, sequelize_typescript_1.Column)({
        defaultValue: 0,
    }),
    __metadata("design:type", Number)
], Url.prototype, "clickCount", void 0);
exports.Url = Url = __decorate([
    (0, sequelize_typescript_1.Table)({
        tableName: 'urls',
    })
], Url);
//# sourceMappingURL=url.model.js.map