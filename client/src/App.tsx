import React from 'react';
import '@vkontakte/vkui/dist/vkui.css';
import { ConfigProvider } from '@vkontakte/vkui';
import { Router } from 'modules/routes';
import { initSentry } from 'core/sentry';
import { useSelector, useDispatch } from 'react-redux';
import { FetchingStateName } from 'core/models';

const App = React.memo(() => {
  const scheme = useSelector((state) => state.ui.theme);
  const dispatch = useDispatch();

  React.useEffect(() => {
    initSentry();
    dispatch({
      type: 'SET_UPDATING_DATA',
      payload: FetchingStateName.UserSKeys,
    });
  }, []);

  return (
    <ConfigProvider isWebView scheme={scheme}>
      <Router />
    </ConfigProvider>
  );
});

export default App;
