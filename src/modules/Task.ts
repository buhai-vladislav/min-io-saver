import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TaskController } from '../controllers/Task';
import { TaskService } from '../services/Task';
import { File } from '../db/models/File';
import { Task } from '../db/models/Task';
import { FileModule } from './File';

@Module({
  imports: [TypeOrmModule.forFeature([Task, File]), FileModule],
  controllers: [TaskController],
  providers: [TaskService],
  exports: [TaskService],
})
export class TaskModule {}
