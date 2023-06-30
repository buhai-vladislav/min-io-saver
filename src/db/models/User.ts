import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { Task } from './Task';
import { VersionedEntity } from './VersionedEntity';

@Entity('users')
export class User extends VersionedEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column('varchar', { length: 50 })
  fullname: string;

  @Column('varchar', {
    length: 255,
    unique: true,
  })
  email: string;

  @Column('varchar', { length: 255 })
  password: string;

  @OneToMany(() => Task, (tasks) => tasks)
  tasks?: Task[];
}
