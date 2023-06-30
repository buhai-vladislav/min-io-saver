import {
  Column,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
  JoinColumn,
  OneToOne,
} from 'typeorm';
import { File } from './File';
import { User } from './User';
import { VersionedEntity } from './VersionedEntity';

@Entity('tasks')
export class Task extends VersionedEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column('varchar', { length: 255 })
  title: string;

  @ManyToOne(() => User, (user) => user.tasks, {
    nullable: true,
    cascade: true,
    onDelete: 'CASCADE',
  })
  @JoinColumn({ name: 'creator_id', referencedColumnName: 'id' })
  creator?: User;

  @OneToOne(() => File, (file) => file.task, {
    nullable: true,
    cascade: true,
    onDelete: 'CASCADE',
  })
  @JoinColumn({ name: 'file_id', referencedColumnName: 'id' })
  file?: File;
}
