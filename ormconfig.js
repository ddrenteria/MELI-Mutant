// eslint-disable-next-line @typescript-eslint/no-var-requires
const process = require('process');

module.exports = {
  type: 'postgres',
  url: process.env.DATABASE_URL,
  synchronize: false,
  dropSchema: false,
  logging: true,
  sslmode: 'require',
  entities: ['dist/**/*.entity{.ts,.js}'],
  migrations: ['dist/db/migrations/**/*{.ts,.js}'],
  cli: {
    entitiesDir: 'src',
    migrationsDir: 'src/db/migrations',
  },
};
