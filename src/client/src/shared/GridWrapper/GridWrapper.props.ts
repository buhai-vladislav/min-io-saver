import { CSS } from '@nextui-org/react';
import { ReactNode } from 'react';

interface IGridWrapperProps {
  children: ReactNode;
  css?: CSS;
  className?: string;
  childrenCss?: CSS;
  childrenClassName?: string;
}

export type { IGridWrapperProps };
