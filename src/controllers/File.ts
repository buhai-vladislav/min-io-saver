import {
  Controller,
  Post,
  Req,
  UploadedFile,
  UseInterceptors,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { FileService } from '../services/File';
import { File } from '../db/models/File';

import type { IBufferedFile } from '../types';
import { Request } from 'express';

@Controller('files')
export class FileController {
  constructor(private readonly fileService: FileService) {}

  @Post()
  @UseInterceptors(FileInterceptor('file'))
  public async uploadFile(
    @UploadedFile() file: IBufferedFile,
    @Req() request: Request,
  ): Promise<Partial<File>> {
    return this.fileService.upload(file, request);
  }
}
