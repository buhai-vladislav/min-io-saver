import React, { FC } from 'react';
import { Avatar, Button, Navbar, Popover, Text } from '@nextui-org/react';
import { NavbarWrapper } from './Header.presets';
import { Link, useNavigate } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../../store/hooks/hooks';
import { resetUser } from '../../store/reduser/user';
import { IHeaderProps } from './Header.props';

export const Header: FC<IHeaderProps> = ({ isLoading }) => {
  const { user } = useAppSelector((state) => state.user);
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const logoutHandler = () => {
    dispatch(resetUser());
    localStorage.removeItem('token');
    navigate('/login');
  };
  return (
    <NavbarWrapper variant="sticky">
      <Navbar.Brand>
        <Text b color="inherit">
          <Link className="link" to="/">
            {/*  <img
              className="logo"
              src="../movie-film-svgrepo-com.svg"
              alt="BM"
            /> */}
            SimpleSaver
          </Link>
        </Text>
      </Navbar.Brand>
      <Navbar.Content>
        {!user ? (
          <>
            <Button auto light>
              <Link to="login">Login</Link>
            </Button>
            <Button auto flat>
              <Link to="signup">Sign Up</Link>
            </Button>
          </>
        ) : (
          <>
            <Link to="main">
              <Text h5 css={{ marginBottom: '0' }}>
                Main
              </Text>
            </Link>
            <Popover placement="left">
              <Popover.Trigger>
                <Avatar
                  text={user.fullname}
                  squared
                  bordered
                  css={{ cursor: 'pointer' }}
                />
              </Popover.Trigger>
              <Popover.Content>
                <Button size="sm" onPress={logoutHandler}>
                  Log out
                </Button>
              </Popover.Content>
            </Popover>
          </>
        )}
      </Navbar.Content>
    </NavbarWrapper>
  );
};
