import { ConfigProvider } from '@vkontakte/vkui';
import '@vkontakte/vkui/dist/vkui.css';
import { push } from 'connected-react-router';
import { appV, FetchingStateName } from 'core/models';
import { getFullLocation } from 'core/selectors/router';
import { initSentry } from 'core/sentry';
import { Router } from 'modules/routes';
import React from 'react';
import { useDispatch, useSelector } from 'react-redux';

const App = React.memo(() => {
  const scheme = useSelector((state) => state.ui.theme);
  const online = useSelector((state) => state.ui.online);
  const dispatch = useDispatch();
  const location = useSelector(getFullLocation);

  React.useEffect(() => {
    initSentry();
    dispatch({
      type: 'SET_UPDATING_DATA',
      payload: FetchingStateName.UserSKeys,
    });
    dispatch({ type: 'SET_UPDATING_DATA', payload: FetchingStateName.Ads });
    console.log('App version is', appV);
  }, []);

  React.useEffect(() => {
    if (!online) {
      window.addEventListener('popstate', preventToGoBack);
    }

    return () => {
      window.removeEventListener('popstate', preventToGoBack);
    };
  }, [online]);

  const preventToGoBack = (e: PopStateEvent) => {
    e.preventDefault();
    dispatch(push(location));
  };

  return (
    <ConfigProvider isWebView={online} scheme={scheme}>
      <Router />
    </ConfigProvider>
  );
});

export default App;
