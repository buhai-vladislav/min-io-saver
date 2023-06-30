import React, { useEffect } from 'react';
import { Outlet, useNavigate } from 'react-router-dom';
import { Grid } from '@nextui-org/react';
import { Header } from '../components/Header';
import { useAppDispatch } from '../store/hooks/hooks';
import { useGetSelfQuery } from '../store/api/main.api';
import { resetUser, setUser } from '../store/reduser/user';

export default function RootLayout() {
  const dispatch = useAppDispatch();
  const { data, isError, isLoading } = useGetSelfQuery({});
  const navigate = useNavigate();

  useEffect(() => {
    if (data) {
      dispatch(setUser(data));
      navigate('/main');
    }
    if (isError) {
      dispatch(resetUser());
      navigate('/login');
    }
  }, [data, isError]);

  return (
    <Grid.Container
      alignContent="center"
      justify="center"
      css={{ height: '100%', width: '100%' }}
    >
      <Header isLoading={isLoading} />
      <Outlet />
    </Grid.Container>
  );
}
