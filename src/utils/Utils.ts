import { HttpStatus, HttpException } from '@nestjs/common';
import { Request } from 'express';
import { AppModule } from '../modules/Application';
import { DEFAULT_PAGINATION_LIMIT, PAGINATION_MAX_LIMIT } from './constants';

export const throwError = (
  error: any,
  status: HttpStatus = HttpStatus.BAD_REQUEST,
  defaultMessage?: string,
) => {
  let message = defaultMessage ?? 'Something went wrong!';
  let statusCode;

  if (error instanceof HttpException) {
    message = error.message;
    statusCode = error?.getStatus();
  }
  if (typeof error === 'string') {
    message = error;
  }

  throw new HttpException(message, statusCode ?? status);
};

export const getPaginationLimit = (outerLimit: number): number => {
  const positiveLimit = outerLimit < 0 ? DEFAULT_PAGINATION_LIMIT : outerLimit;
  const limit =
    positiveLimit > PAGINATION_MAX_LIMIT ? PAGINATION_MAX_LIMIT : positiveLimit;

  return limit;
};

export const getImageRootPath = (request: Request) => {
  const path = `${request.protocol}://${request.get('Host')}/${
    process.env.MINIO_BUCKET_NAME
  }`.replace(AppModule.port.toString(), process.env.MINIO_PORT);

  return path;
};
