import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { IFileResponse } from '../../types/File';

import type { ILogin } from '../../types/Login';
import type { ISignUp, ISignInResponse } from '../../types/SignUp';
import type {
  ICreateTask,
  ITask,
  ITaskRemove,
  ITasksData,
} from '../../types/Task';
import type { IUser } from '../../types/User';

const baseQuery = fetchBaseQuery({
  baseUrl: '/',
  prepareHeaders: (headers) => {
    const token = localStorage.getItem('token');

    if (token) {
      headers.set('authorization', `Bearer ${token}`);
    }

    return headers;
  },
});

export const mainApi = createApi({
  reducerPath: 'main',
  baseQuery,
  endpoints: (build) => ({
    login: build.mutation<ISignInResponse, ILogin>({
      query: ({ email, password }) => ({
        url: 'auth/signin',
        method: 'POST',
        body: {
          email,
          password,
        },
      }),
    }),
    signup: build.mutation<IUser, ISignUp>({
      query: ({ email, password, fullname }) => ({
        url: 'auth/signup',
        method: 'POST',
        body: {
          email,
          password,
          fullname,
        },
      }),
    }),
    getSelf: build.query<IUser, unknown>({
      query: () => ({
        url: '/users/self',
        method: 'GET',
      }),
    }),
    uploadImage: build.mutation<IFileResponse, FormData>({
      query: (data) => ({
        url: '/files',
        method: 'POST',
        body: data,
      }),
    }),
    createTask: build.mutation<ITask, ICreateTask>({
      query: ({ title, file }) => ({
        url: '/tasks',
        method: 'POST',
        body: {
          title,
          fileId: file.id,
        },
      }),
      async onQueryStarted(
        { title, file, user },
        { dispatch, queryFulfilled },
      ) {
        const { data: updatedPost } = await queryFulfilled;
        const patchResult = dispatch(
          mainApi.util.updateQueryData('getTasks', undefined, (draft) => {
            const object: ITasksData = {
              items: [
                ...draft.items,
                {
                  ...updatedPost,
                  title,
                  file,
                  creator: user,
                },
              ],
              meta: { ...draft.meta },
            };
            Object.assign(draft, object);
          }),
        );
        try {
          await queryFulfilled;
        } catch {
          patchResult.undo();
        }
      },
    }),
    getTasks: build.query<ITasksData, void>({
      query: () => ({
        url: '/tasks',
        method: 'GET',
      }),
    }),
    removeTask: build.mutation<ITaskRemove, string>({
      query: (id) => ({
        url: `/tasks/${id}`,
        method: 'DELETE',
      }),
      async onQueryStarted(id, { dispatch, queryFulfilled }) {
        const patchResult = dispatch(
          mainApi.util.updateQueryData('getTasks', undefined, (draft) => {
            const items = draft.items.filter((task) => task.id !== id);
            const object: ITasksData = {
              items,
              meta: { ...draft.meta },
            };
            Object.assign(draft, object);
          }),
        );
        try {
          await queryFulfilled;
        } catch {
          patchResult.undo();
        }
      },
    }),
  }),
});

export const {
  useLoginMutation,
  useSignupMutation,
  useLazyGetSelfQuery,
  useGetSelfQuery,
  useUploadImageMutation,
  useCreateTaskMutation,
  useLazyGetTasksQuery,
  useGetTasksQuery,
  useRemoveTaskMutation,
} = mainApi;
