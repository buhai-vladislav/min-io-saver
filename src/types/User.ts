import { User } from '../db/models/User';

export type UserPassLess = Omit<Partial<User>, 'password'>;
