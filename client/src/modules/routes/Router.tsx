import React from 'react';
import { useDispatch } from 'react-redux';
import { Main } from 'roots/Main';
import { FetchingStateName, AppDispatchActions } from 'core/models';
import { ErrorBoundary } from 'modules/error-bound';

export const Router = React.memo(() => {
  const dispatch = useDispatch<AppDispatchActions>();

  React.useEffect(() => {
    dispatch({ type: 'SET_UPDATING_DATA', payload: FetchingStateName.User });
    dispatch({ type: 'SET_UPDATING_DATA', payload: FetchingStateName.Ads });
  }, []);

  return (
    <ErrorBoundary>
      <Main />
    </ErrorBoundary>
  );
});
