import { BadRequestException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Task } from '../db/models/Task';
import { CreateTaskDTO } from '../dtos';
import {
  getImageRootPath,
  getPaginationLimit,
  throwError,
} from '../utils/Utils';
import { FindOptionsWhere, Repository } from 'typeorm';
import { BaseService } from './Base';
import { FileService } from './File';

import type { IAffectedResponse, IPagination } from '../types';
import { Request } from 'express';

@Injectable()
export class TaskService extends BaseService<Task> {
  constructor(
    @InjectRepository(Task) private readonly taskRepository: Repository<Task>,
    private readonly fileService: FileService,
  ) {
    super(taskRepository);
  }

  public async create(taskDTO: CreateTaskDTO): Promise<Partial<Task>> {
    let response: Partial<Task> = null;
    const { userId, fileId, title } = taskDTO;

    try {
      response = await this.taskRepository
        .create({ title, creator: { id: userId }, file: { id: fileId } })
        .save();
    } catch (error) {
      throwError(error, HttpStatus.BAD_REQUEST);
    }
    return response;
  }

  public async getMany(
    userId: string,
    page: number,
    limit: number,
    request: Request,
  ): Promise<IPagination<Task>> {
    let response: IPagination<Task> = null;
    const formatedLimit = getPaginationLimit(limit);
    const skip = page >= 1 ? (page - 1) * formatedLimit : formatedLimit;

    try {
      const responseData = await this.taskRepository.findAndCount({
        where: { creator: { id: userId } },
        relations: ['file'],
        skip,
        take: formatedLimit,
      });

      const [items, totalItemsCount] = responseData;
      const totalPages = Math.ceil(totalItemsCount / formatedLimit);

      const path = getImageRootPath(request);

      const tasks: Array<Task> = items.map((task) => ({
        ...task,
        file: { ...task.file, fileSrc: `${path}/${task.file.fileSrc}` },
      })) as Array<Task>;

      response = {
        items: tasks,
        meta: {
          currentPage: page,
          itemCount: items.length,
          itemsPerPage: limit,
          totalItems: totalItemsCount,
          totalPages,
        },
      };
    } catch (error) {
      throwError(error, HttpStatus.BAD_REQUEST);
    }

    return response;
  }

  public async delete(
    where: FindOptionsWhere<Task>,
  ): Promise<IAffectedResponse> {
    const responseData: IAffectedResponse = { isAffected: false };
    try {
      const task = await this.getOneByOptions({ id: where.id }, ['file']);

      if (!task) {
        throw new BadRequestException('Task to delete not found!');
      }

      if (task.file) {
        const { id } = task.file;

        const fileDeleteResult = await this.fileService.delete(id);

        responseData.isAffected = fileDeleteResult.isAffected;
      }
    } catch (error) {
      throwError(error, HttpStatus.BAD_REQUEST);
    }
    return responseData;
  }
}
