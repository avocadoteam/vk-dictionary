import React from 'react';
import '@vkontakte/vkui/dist/vkui.css';
import { ConfigProvider } from '@vkontakte/vkui';
import { Router } from 'modules/routes';
import { initSentry } from 'core/sentry';
import { useSelector, useDispatch } from 'react-redux';
import { appV, FetchingStateName } from 'core/models';
import { getFullLocation } from 'core/selectors/router';
import { push } from 'connected-react-router';
import { vkBridge } from 'core/vk-bridge/instance';

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

  const preventPop = React.useCallback(
    (e: PopStateEvent) => {
      e.preventDefault();
      dispatch(push(location));
    },
    [location]
  );

  React.useEffect(() => {
    if (!online) {
      window.addEventListener('popstate', preventPop);
      vkBridge.send('VKWebAppDisableSwipeBack');
    }

    return () => {
      if (online) {
        window.removeEventListener('popstate', preventPop);
        vkBridge.send('VKWebAppEnableSwipeBack');
      }
    };
  }, [preventPop, online]);

  return (
    <ConfigProvider isWebView={online} scheme={scheme}>
      <Router />
    </ConfigProvider>
  );
});

export default App;
