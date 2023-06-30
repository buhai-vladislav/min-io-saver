import { Grid, styled } from '@nextui-org/react';

export const TaskListWrapper = styled(Grid.Container, {
  '.item': {
    flexDirection: 'row',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    '&div:nth-child(1)': {
      flexDirection: 'row',
    },
    svg: {
      width: '20px',
      height: '20px',
      fill: '#fff',
    },
  },
  '.scroll-container': {
    maxHeight: '300px',
    minWidth: '450px',
    display: 'flex',
    flexDirection: 'column',
    gap: '10px',
    width: '100%',
    dropShadow: '$xl',
    '&::-webkit-scrollbar': {
      width: '10px',
    },
    /* Track */
    '&::-webkit-scrollbar-track': {
      background: '#f1f1f1',
      borderRadius: '5px',
    },
    /* Handle */
    '&::-webkit-scrollbar-thumb': {
      background: '#888',
      borderRadius: '5px',
      transition: 'all 0.2s ease-in-out',
    },

    /* Handle on hover */
    '&::-webkit-scrollbar-thumb:hover': {
      background: '#555',
    },
  },
  button: {
    minWidth: 'unset',
  },
  '.title': {
    width: '250px',
    fontWeight: '600',
    wordWrap: 'break-word',
  },
});
