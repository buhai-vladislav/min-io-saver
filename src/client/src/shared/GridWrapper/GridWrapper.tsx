import React, { FC } from 'react';
import { Grid } from '@nextui-org/react';

import type { IGridWrapperProps } from './GridWrapper.props';

export const GridWrapper: FC<IGridWrapperProps> = ({
  children,
  className,
  css,
  childrenClassName,
  childrenCss,
}) => {
  return (
    <Grid.Container
      css={{ height: 'calc(100vh - 76px)', ...css }}
      alignContent="center"
      justify="center"
      className={className}
    >
      <Grid className={childrenClassName} css={childrenCss}>
        {children}
      </Grid>
    </Grid.Container>
  );
};
