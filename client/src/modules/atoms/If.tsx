import React from 'react';

export const If = React.memo<React.PropsWithChildren<{ is: boolean; fallback?: React.ReactNode }>>(
  (props) => (props.is ? <>{props.children}</> : props.fallback ? <>{props.fallback}</> : null)
);
