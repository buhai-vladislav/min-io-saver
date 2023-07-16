import { styled } from '@nextui-org/react';

export const CreateTaskWrapper = styled('form', {
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  justifyContent: 'center',
  gap: '20px',
  minWidth: '350px',
  dropShadow: '$xl',
  backgroundColor: '#fff',
  borderRadius: '15px',
  padding: '30px',
  '.nextui-button-text': {
    width: '100%',
  },
  label: {
    width: '100%',
    textOverflow: 'ellipsis',
    overflow: 'hidden',
    maxWidth: '260px',
    whiteSpace: 'nowrap',
  },
  '#file': {
    display: 'none',
  },
  '.button': {
    width: '100%',
  },
  '.clear': {
    width: '150px',
  },
});
