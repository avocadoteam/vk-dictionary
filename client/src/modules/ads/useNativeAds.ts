import { AppDispatchActions, FetchingStateName } from 'core/models';
import { useEffect } from 'react';
import { useDispatch } from 'react-redux';

export const useCheckNativeAds = () => {
  const dispatch = useDispatch<AppDispatchActions>();

  useEffect(() => {
    dispatch({ type: 'SET_UPDATING_DATA', payload: FetchingStateName.CheckAds });
  }, []);
};
