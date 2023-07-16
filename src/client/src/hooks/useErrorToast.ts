import { SerializedError } from '@reduxjs/toolkit';
import { FetchBaseQueryError } from '@reduxjs/toolkit/dist/query';
import { useEffect } from 'react';
import { toast, ToastOptions } from 'react-toastify';
import { HttpStatus } from '../types/HttpStatus';

type HooksError = FetchBaseQueryError | SerializedError | undefined;

interface IErrorItem {
  status: HttpStatus;
  errorMessage?: string;
  callback?: () => void;
}

interface IResponseData {
  message: string;
  statusCode: HttpStatus;
}

export function useErrorToast(
  error: HooksError,
  errorCondition: IErrorItem[],
  toastOptions?: ToastOptions,
) {
  useEffect(() => {
    console.log('error', error);
    if (error && 'data' in error) {
      const { statusCode, message } = error.data as IResponseData;

      errorCondition.forEach(({ status, errorMessage, callback }) => {
        if (message && statusCode && statusCode === status) {
          toast(errorMessage ?? message, toastOptions);
          callback && callback();
        }
      });
    }
  }, [error]);
}
