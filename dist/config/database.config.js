"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = () => ({
    database: {
        dialect: 'mysql',
        host: 'localhost',
        port: 3306,
        username: 'root',
        password: 'yourpassword',
        database: 'url_shortener',
        autoLoadModels: true,
        synchronize: true,
    },
});
//# sourceMappingURL=database.config.js.map