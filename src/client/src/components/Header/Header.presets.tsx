import { styled, Navbar } from '@nextui-org/react';

export const NavbarWrapper = styled(Navbar, {
  '.nextui-input-main-container': {
    width: '400px',
  },
  '.logo': {
    width: '25px',
    height: '25px',
    marginRight: '10px',
  },
  '.link': {
    display: 'flex',
    color: '#000',
    fontWeight: '700',
  },
});
