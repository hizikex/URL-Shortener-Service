export default () => ({
  database: {
    dialect: 'mysql',
    host: 'localhost',
    port: 3306,
    username: 'root',
    password: 'yourpassword',
    database: 'url_shortener',
    autoLoadModels: true,
    synchronize: true, // dev only
  },
});