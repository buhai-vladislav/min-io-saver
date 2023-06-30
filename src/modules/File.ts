import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { FileController } from '../controllers/File';
import { File } from '../db/models/File';
import { FileService } from '../services/File';
import { MinioClientModule } from './Minio';

@Module({
  imports: [TypeOrmModule.forFeature([File]), MinioClientModule],
  controllers: [FileController],
  providers: [FileService],
  exports: [FileService],
})
export class FileModule {}
