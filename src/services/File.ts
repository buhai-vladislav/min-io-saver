import { BadRequestException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { IBufferedFile } from '../types/File';
import { getImageRootPath, throwError } from '../utils/Utils';
import { Repository } from 'typeorm';
import { File } from '../db/models/File';
import { MinioClientService } from './MinioClient';
import { IAffectedResponse } from '../types';
import { Request } from 'express';

@Injectable()
export class FileService {
  constructor(
    @InjectRepository(File) private readonly fileRepository: Repository<File>,
    private readonly minioClientService: MinioClientService,
  ) {}

  public async upload(
    file: IBufferedFile,
    request: Request,
  ): Promise<Partial<File>> {
    let storedFile: Partial<File> = null;
    const { encoding, originalname, size, mimetype } = file;
    try {
      const fileSrc = await this.minioClientService.upload(file);

      storedFile = await this.fileRepository
        .create({
          encoding,
          name: originalname,
          size,
          mimetype,
          fileSrc,
        })
        .save();

      const path = getImageRootPath(request);
      storedFile = {
        ...storedFile,
        fileSrc: path.concat('/', storedFile.fileSrc),
      };
    } catch (error) {
      throwError(error, HttpStatus.BAD_REQUEST);
    }
    return storedFile;
  }

  public async delete(fileId: string) {
    const resultResponse: IAffectedResponse = { isAffected: false };
    try {
      const file = await this.fileRepository.findOne({ where: { id: fileId } });

      if (!file) {
        throw new BadRequestException('File to delete not found!');
      }

      const { fileSrc } = file;

      if (fileSrc) {
        await this.minioClientService.delete(fileSrc);
      }

      const fileDeleteResult = await this.fileRepository.delete({ id: fileId });

      resultResponse.isAffected = !!fileDeleteResult.affected;
    } catch (error) {
      throwError(error, HttpStatus.BAD_REQUEST);
    }

    return resultResponse;
  }
}
