import { Button, Input, Loading, Text } from '@nextui-org/react';
import { useFormik } from 'formik';
import { useLoginMutation } from '../../store/api/main.api';
import { useAppDispatch } from '../../store/hooks/hooks';
import { setUser } from '../../store/reduser/user';
import { object, string } from 'yup';
import { ToastOptions } from 'react-toastify';
import {
  AUTH_INPUT_WIDTH,
  USER_NOT_FOUND_MESSAGE,
} from '../../utils/constants';

import type { ILoginFormProps } from './Login.props';
import { FormWrapper } from '../../shared';
import { useNavigate } from 'react-router-dom';
import { IMutation } from '../../types/Mutation';
import { ISignInResponse } from '../../types/SignUp';

const ValidationSchema = object({
  email: string().required('Email is required').email('Is not an email format'),
  password: string().required('Password is required'),
});

export const Login = () => {
  const [login, { isLoading, error }] = useLoginMutation();
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const toastOptions: ToastOptions = {
    position: 'bottom-center',
    type: 'error',
  };

  const onSubmit = async ({ email, password }: ILoginFormProps) => {
    const response: IMutation<ISignInResponse> = await login({
      email,
      password,
    });

    if (response.data?.user) {
      const { token, user } = response.data;
      dispatch(setUser(user));

      localStorage.setItem('token', token);
      navigate('/main');
    }
  };

  const formik = useFormik<ILoginFormProps>({
    initialValues: {
      email: '',
      password: '',
    },
    onSubmit,
    validationSchema: ValidationSchema,
    validateOnChange: true,
  });

  /* const errorItems: IErrorItem[] = [
    {
      status: HttpStatus.NOT_FOUND,
      errorMessage: USER_NOT_FOUND_MESSAGE,
    },
    {
      status: HttpStatus.UNAUTHORIZED,
      errorMessage: USER_NOT_FOUND_MESSAGE,
    },
  ];

  useErrorToast(error, errorItems, toastOptions); */

  return (
    <FormWrapper onSubmit={formik.handleSubmit}>
      <Text h3>Login</Text>
      <Input
        color="primary"
        rounded
        label="Email"
        onChange={formik.handleChange}
        name="email"
        width={AUTH_INPUT_WIDTH}
      />
      <Input.Password
        color="primary"
        rounded
        width={AUTH_INPUT_WIDTH}
        label="Password"
        name="password"
        onChange={formik.handleChange}
      />
      <Button
        rounded
        shadow
        type="submit"
        disabled={!(formik.isValid && formik.dirty) || isLoading}
      >
        {isLoading ? (
          <Loading type="points-opacity" color="currentColor" size="sm" />
        ) : (
          <span>Login</span>
        )}
      </Button>
    </FormWrapper>
  );
};
