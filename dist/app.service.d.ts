import { Sequelize } from 'sequelize';
export declare class AppService {
    private sequelize;
    constructor(sequelize: Sequelize);
    getHello(): string;
}
