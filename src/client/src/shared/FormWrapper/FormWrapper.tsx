import { styled } from '@nextui-org/react';
import { AUTH_INPUT_WIDTH } from '../../utils/constants';

export const FormWrapper = styled('form', {
  borderRadius: '25px',
  boxShadow: '$lg',
  minWidth: '350px',
  padding: '20px',
  dflex: 'center',
  flexDirection: 'column',
  gap: '20px',
  button: {
    width: AUTH_INPUT_WIDTH,
    marginTop: '20px',
  },
});
