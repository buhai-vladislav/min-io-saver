interface IFileResponse {
  name: string;
  encoding: string;
  mimetype: string;
  size: number;
  fileSrc: string;
  createdAt: Date;
  updatedAt: Date;
  rowVersion: number;
  id: string;
}

export type { IFileResponse };
