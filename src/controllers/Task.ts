import {
  Body,
  Controller,
  DefaultValuePipe,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Post,
  Query,
  Req,
} from '@nestjs/common';
import { CreateTaskDTO } from '../dtos';
import {
  DEFAULT_PAGINATION_LIMIT,
  DEFAULT_PAGINATION_PAGE,
} from '../utils/constants';
import { Task } from '../db/models/Task';
import { TaskService } from '../services/Task';

import type { IAffectedResponse, IPagination } from '../types';

@Controller('tasks')
export class TaskController {
  constructor(private readonly taskService: TaskService) {}

  @Post()
  public async createTask(
    @Body() taskDTO: CreateTaskDTO,
    @Req() request: any,
  ): Promise<Partial<Task>> {
    const userId = request?.user?.userId;
    return this.taskService.create({ ...taskDTO, userId });
  }

  @Delete('/:taskId')
  public async removeTaskById(
    @Param('taskId') taskId: string,
  ): Promise<IAffectedResponse> {
    return this.taskService.delete({ id: taskId });
  }

  @Get()
  public async getPaginated(
    @Req() request: any,
    @Query('page', new DefaultValuePipe(DEFAULT_PAGINATION_PAGE), ParseIntPipe)
    page: number = DEFAULT_PAGINATION_PAGE,
    @Query(
      'limit',
      new DefaultValuePipe(DEFAULT_PAGINATION_LIMIT),
      ParseIntPipe,
    )
    limit: number = DEFAULT_PAGINATION_LIMIT,
  ): Promise<IPagination<Task>> {
    const userId = request?.user?.userId;

    return this.taskService.getMany(userId, page, limit, request);
  }
}
