import { Button, Input, Loading } from '@nextui-org/react';
import { useFormik } from 'formik';
import React, { ChangeEvent } from 'react';
import { mixed, object, string } from 'yup';
import { GridWrapper } from '../../shared/GridWrapper';
import {
  useCreateTaskMutation,
  useUploadImageMutation,
} from '../../store/api/main.api';
import { useAppSelector } from '../../store/hooks/hooks';
import { IFileResponse } from '../../types/File';
import { IMutation } from '../../types/Mutation';
import { TaskList } from './components/TaskList';
import { CreateTaskWrapper } from './CreateTask.presets';
import type { ICreateTaskInitialValues } from './CreateTask.props';

const ValidationSchema = object({
  title: string()
    .required('Title is required!')
    .max(255, 'Your title is too long!'),
  file: mixed()
    .required('File is required!')
    .test(
      'size',
      'File is not choosed',
      (value: any) => value && value.size > 0,
    ),
});

export const CreateTask = () => {
  const [uploadImage] = useUploadImageMutation();
  const [createTask] = useCreateTaskMutation();
  const { user } = useAppSelector((state) => state.user);

  const onFileInputChange = ({
    currentTarget,
    target,
  }: ChangeEvent<HTMLInputElement>): void => {
    if (currentTarget.files && currentTarget.files.length > 0) {
      formik.setFieldValue('file', currentTarget.files[0]);
      target.value = '';
    }
  };

  const onSubmit = async ({
    file,
    title,
  }: ICreateTaskInitialValues): Promise<void> => {
    if (file && user) {
      const formData = new FormData();
      const blob = file.slice();
      formData.append('file', blob, file.name);

      const response: IMutation<IFileResponse> = await uploadImage(formData);

      if (response?.data) {
        const file = response.data;

        await createTask({ title, file, user });
        formik.setValues({ file: null, title: '' }, false);
      }
    }
  };

  const formik = useFormik<ICreateTaskInitialValues>({
    initialValues: {
      file: null,
      title: '',
    },
    onSubmit,
    validationSchema: ValidationSchema,
    validateOnChange: true,
  });

  return (
    <GridWrapper
      childrenCss={{
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'flex-start',
        gap: '40px',
      }}
    >
      <CreateTaskWrapper onSubmit={formik.handleSubmit}>
        <Input
          name="title"
          fullWidth
          label="Task title"
          placeholder="My new task..."
          onChange={formik.handleChange}
          status={!!formik.errors.title ? 'error' : 'default'}
          helperText={formik.errors.title}
          value={formik.values.title}
        />
        <Button
          className="button"
          type="button"
          bordered
          color={!!formik.errors.file ? 'error' : 'primary'}
        >
          <label htmlFor="file">
            {!!formik.errors.file
              ? formik.errors.file
              : formik.values.file?.name ?? 'Choose file'}
          </label>
        </Button>
        <input
          id="file"
          name="file"
          type="file"
          onChange={onFileInputChange}
          accept="image/png, image/jpeg"
        />
        <Button.Group className="button">
          <Button className="clear" bordered onPress={formik.handleReset}>
            Clear
          </Button>
          <Button
            className="button"
            type="submit"
            disabled={!formik.dirty || formik.isSubmitting}
          >
            {formik.isSubmitting ? (
              <Loading type="points-opacity" color="currentColor" size="sm" />
            ) : (
              'Create'
            )}
          </Button>
        </Button.Group>
      </CreateTaskWrapper>
      <TaskList />
    </GridWrapper>
  );
};
