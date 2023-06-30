import 'reflect-metadata';
import { DataSource } from 'typeorm';
import dotenv from 'dotenv';

// You can change a path and the name of your local .env file for developing
dotenv.config({ path: './.env' });

export const AppDataSource = new DataSource({
  type: 'postgres',
  host: process.env.DB_HOST,
  port: Number.parseInt(process.env.DB_PORT, 10),
  username: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_DATABASE,
  entities: ['dist/src/db/models/*.js'],
  migrationsTableName: 'migrations',
  migrations: ['dist/src/db/migrations/*.js'],
});
