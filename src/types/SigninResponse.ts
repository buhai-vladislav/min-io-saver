import { User } from '../db/models/User';

export interface ISigininResponse {
  user: Omit<Partial<User>, 'password'>;
  token: string;
}
