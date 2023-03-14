import { ConfigProvider } from '@vkontakte/vkui';
import '@vkontakte/vkui/dist/vkui.css';
import { appV, FetchingStateName } from 'core/models';
import { initSentry } from 'core/sentry';
import { Router } from 'modules/routes';
import React from 'react';
import { useDispatch, useSelector } from 'react-redux';

const App = React.memo(() => {
  const scheme = useSelector((state) => state.ui.theme);
  const online = useSelector((state) => state.ui.online);
  const dispatch = useDispatch();

  React.useEffect(() => {
    initSentry();
    dispatch({
      type: 'SET_UPDATING_DATA',
      payload: FetchingStateName.UserSKeys,
    });
    console.log('App version is', appV);
  }, []);

  return (
    <ConfigProvider isWebView={online} scheme={scheme}>
      <Router />
    </ConfigProvider>
  );
});

export default App;
