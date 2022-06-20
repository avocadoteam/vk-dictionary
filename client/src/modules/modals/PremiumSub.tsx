import { isThemeDrak } from 'core/selectors/common';
import React from 'react';
import { useSelector } from 'react-redux';

export const PremiumSub = () => {
  const dark = useSelector(isThemeDrak);
  const appearance = dark ? 'dark' : 'light';

  return (
    <iframe
      src={`https://avocadoteam.github.io/app-sub-modal/?appearance=${appearance}&app=dict`}
      style={{ height: 'calc(100vh - 120px)', border: 0 }}
      width="100%"
    />
  );
};
