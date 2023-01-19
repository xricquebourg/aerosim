// eslint-disable-next-line @typescript-eslint/no-var-requires
import { DataSource } from 'typeorm';
import * as dotenv from 'dotenv';
dotenv.config();

export const AppDataSource = new DataSource({
  type: 'mysql',
  host: process.env.HOST,
  port: parseInt(process.env.MYSQL_PORT ?? '3306'),
  username: process.env.MYSQL_USER,
  password: process.env.MYSQL_PASSWORD,
  database: process.env.MYSQL_DATABASE,
  logging: false,
  entities: ['src/entity/*.ts'],

  // Synchronize set to true, (all change in entities will be updated in db without migration)
  synchronize: true,
  // Take all migration in order to act on db directly with sql statement
  migrations: ['src/migrations/*.ts'],
});
