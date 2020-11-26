import { ErrorBoundary } from 'modules/error-bound';
import React from 'react';
import { Main } from 'roots/Main';

export const Router: React.FC = () => (
  <ErrorBoundary>
    <Main />
  </ErrorBoundary>
);
