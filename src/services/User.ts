import { Repository } from 'typeorm';
import { User } from '../db/models/User';
import { BaseService } from './Base';
import { InjectRepository } from '@nestjs/typeorm';

export class UserService extends BaseService<User> {
  constructor(
    @InjectRepository(User) private readonly userRepository: Repository<User>,
  ) {
    super(userRepository);
  }
}
