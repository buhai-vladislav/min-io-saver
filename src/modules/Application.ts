import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { ServeStaticModule } from '@nestjs/serve-static';
import { TypeOrmModule } from '@nestjs/typeorm';
import { join } from 'path';
import { AuthModule } from './Auth';
import { FileModule } from './File';
import { MinioClientModule } from './Minio';
import { TaskModule } from './Task';
import { UserModule } from './User';

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: process.env.NODE_ENV
        ? `.${process.env.NODE_ENV}.env`
        : '.env',
      isGlobal: true,
    }),
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: process.env.DB_HOST,
      port: Number.parseInt(process.env.DB_PORT, 10),
      username: process.env.DB_USER,
      password: process.env.DB_PASSWORD,
      database: process.env.DB_DATABASE,
      entities: ['dist/src/db/models/*.js'],
      migrationsTableName: 'migrations',
      migrations: ['dist/src/db/migrations/*.js'],
    }),
    ServeStaticModule.forRoot({
      rootPath: join(__dirname, '..', '../../src/client/build'),
    }),
    MinioClientModule,
    FileModule,
    UserModule,
    TaskModule,
    AuthModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {
  static port: number;

  constructor() {
    AppModule.port = Number.parseInt(process.env.PORT) || 3000;
  }
}
