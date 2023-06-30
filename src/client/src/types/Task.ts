import { IFileResponse } from './File';
import { IUser } from './User';

interface ITask {
  title: string;
  creator: Partial<IUser>;
  file: Partial<IFileResponse>;
  createdAt: Date;
  updatedAt: Date;
  rowVersion: number;
  id: string;
}

interface ICreateTask {
  title: string;
  file: IFileResponse;
  user: IUser;
}

interface IPaginationMeta {
  currentPage: number;
  itemCount: number;
  itemsPerPage: number;
  totalItems: number;
  totalPages: number;
}

interface ITaskRemove {
  isAffected: boolean;
}

interface ITasksData {
  items: ITask[];
  meta: IPaginationMeta;
}

export type { ITask, ICreateTask, ITasksData, IPaginationMeta, ITaskRemove };
