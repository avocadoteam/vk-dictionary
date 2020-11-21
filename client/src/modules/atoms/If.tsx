import React from 'react';

export const If = React.memo<React.PropsWithChildren<{ is: boolean; else?: React.ReactNode }>>(
  (props) => (props.is ? <>{props.children}</> : props.else ? <>{props.else}</> : null)
);
