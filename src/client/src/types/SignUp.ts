import { ILogin } from './Login';
import { IUser } from './User';

interface ISignInResponse {
  user: IUser;
  token: string;
}

interface ISignUp extends ILogin {
  fullname: string;
}

export type { ISignInResponse, ISignUp };
