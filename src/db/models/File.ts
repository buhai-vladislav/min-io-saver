import { Column, Entity, OneToOne, PrimaryGeneratedColumn } from 'typeorm';
import { AppMimeType } from '../../types/File';
import { Task } from './Task';
import { VersionedEntity } from './VersionedEntity';

@Entity('files')
export class File extends VersionedEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column('varchar', { length: 255 })
  name: string;

  @Column('varchar', { length: 50 })
  encoding: string;

  @Column('varchar', { length: 50 })
  mimetype: AppMimeType;

  @Column('integer')
  size: number;

  @Column('varchar', { length: 255 })
  fileSrc?: string;

  @OneToOne(() => Task, (task) => task.file)
  task?: Task;
}
