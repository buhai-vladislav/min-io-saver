export interface IBufferedFile {
  fieldname: string;
  originalname: string;
  encoding: string;
  mimetype: AppMimeType;
  size: number;
  buffer: Buffer | string;
}

export type AppMimeType =
  | 'image/png'
  | 'image/jpeg'
  | 'image/jpg'
  | 'application/octet-stream';

export const FileTypes = [
  'image/png',
  'image/jpeg',
  'image/jpg',
  'application/octet-stream',
];
