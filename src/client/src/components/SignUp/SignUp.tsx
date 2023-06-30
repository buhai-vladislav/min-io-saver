import { Button, Input, Loading, Text } from '@nextui-org/react';
import { useFormik } from 'formik';
import { ToastOptions } from 'react-toastify';
import { object, string, ref } from 'yup';
import { useSignupMutation } from '../../store/api/main.api';
import { AUTH_INPUT_WIDTH } from '../../utils/constants';

import type { ISignUpFormProps } from './SignUp.props';
import type { IMutation } from '../../types/Mutation';
import { useNavigate } from 'react-router-dom';
import { FormWrapper } from '../../shared';
import { IUser } from '../../types/User';

const ValidationSchema = object({
  fullname: string().required('Fullname is required.'),
  email: string()
    .required('Email is required!')
    .email('Is not an email format!'),
  password: string()
    .required('Password is required.')
    .min(8, 'Minimum 8 symbols for password!'),
  confirmPassword: string()
    .required('Confirm password is required.')
    .oneOf([ref('password')], 'Passwords must match.'),
});

export const SignUp = () => {
  const [signup, { isLoading, error }] = useSignupMutation();
  const navigate = useNavigate();

  const onSubmit = async (values: ISignUpFormProps) => {
    const response: IMutation<IUser> = await signup({ ...values });

    if (response?.data) {
      navigate('/login');
    }
  };

  const formik = useFormik<ISignUpFormProps>({
    initialValues: {
      confirmPassword: '',
      email: '',
      fullname: '',
      password: '',
    },
    onSubmit,
    validationSchema: ValidationSchema,
    validateOnChange: false,
  });

  const toastOptions: ToastOptions = {
    position: 'bottom-center',
    type: 'error',
  };

  /* const errorItems: IErrorItem[] = [
    { status: HttpStatus.CONFLICT, errorMessage: 'User already exsist' },
  ];

  useErrorToast(error, errorItems, toastOptions); */

  return (
    <FormWrapper onSubmit={formik.handleSubmit}>
      <Text h3>Sign Up</Text>
      <Input
        color="primary"
        rounded
        status={!!formik.errors.fullname ? 'error' : 'default'}
        helperText={formik.errors.fullname}
        label="Fullname"
        onChange={formik.handleChange}
        name="fullname"
        width={AUTH_INPUT_WIDTH}
      />
      <Input
        color="primary"
        rounded
        label="Email"
        status={!!formik.errors.email ? 'error' : 'default'}
        helperText={formik.errors.email}
        onChange={formik.handleChange}
        name="email"
        width={AUTH_INPUT_WIDTH}
      />
      <Input.Password
        color="primary"
        rounded
        label="Password"
        status={!!formik.errors.password ? 'error' : 'default'}
        helperText={formik.errors.password}
        onChange={formik.handleChange}
        name="password"
        width={AUTH_INPUT_WIDTH}
      />
      <Input.Password
        color="primary"
        rounded
        label="Confirm password"
        status={!!formik.errors.confirmPassword ? 'error' : 'default'}
        helperText={formik.errors.confirmPassword}
        onChange={formik.handleChange}
        name="confirmPassword"
        width={AUTH_INPUT_WIDTH}
      />
      <Button
        rounded
        shadow
        type="submit"
        disabled={!formik.dirty || isLoading}
      >
        {isLoading ? (
          <Loading type="points-opacity" color="currentColor" size="sm" />
        ) : (
          <span>Sign Up</span>
        )}
      </Button>
    </FormWrapper>
  );
};
