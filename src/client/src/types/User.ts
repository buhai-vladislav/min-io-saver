interface IUser {
  fullname: string;
  email: string;
  createdAt: Date;
  updatedAt: Date;
  rowVersion: number;
  id: string;
}

export type { IUser };
