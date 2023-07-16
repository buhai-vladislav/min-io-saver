import { Button, Input, Loading, Text } from '@nextui-org/react';
import { useFormik } from 'formik';
import { useLoginMutation } from '../../store/api/main.api';
import { useAppDispatch } from '../../store/hooks/hooks';
import { setUser } from '../../store/reduser/user';
import { object, string } from 'yup';
import { AUTH_INPUT_WIDTH } from '../../utils/constants';

import type { ILoginFormProps } from './Login.props';
import { FormWrapper } from '../../shared';
import { useNavigate } from 'react-router-dom';
import { IMutation } from '../../types/Mutation';
import { ISignInResponse } from '../../types/SignUp';
import { useErrorToast } from '../../hooks/useErrorToast';
import { HttpStatus } from '../../types/HttpStatus';

const ValidationSchema = object({
  email: string().required('Email is required').email('Is not an email format'),
  password: string().required('Password is required'),
});

export const Login = () => {
  const [login, { isLoading, error }] = useLoginMutation();
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

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

  useErrorToast(
    error,
    [
      {
        status: HttpStatus.NOT_FOUND,
      },
      {
        status: HttpStatus.UNAUTHORIZED,
      },
    ],
    {
      position: 'bottom-center',
      type: 'error',
    },
  );

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
