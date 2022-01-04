// eslint-disable-next-line @typescript-eslint/no-var-requires
const process = require('process');

module.exports = {
  type: 'mysql',
  host: process.env.SQL_CONNECTION_NAME,
  port: 3306,
  username: process.env.MYSQL_USERNAME,
  password: process.env.MYSQL_PASSWORD,
  database: 'meli-poc',
  synchronize: false,
  dropSchema: false,
  logging: true,
  entities: ['dist/**/*.entity{.ts,.js}'],
  migrations: ['dist/db/migrations/**/*{.ts,.js}'],
  cli: {
    entitiesDir: 'src',
    migrationsDir: 'src/db/migrations',
  },
};
