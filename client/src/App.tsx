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

  React.useEffect(() => {
    console.log('popstate online', online, location);
    if (!online) {
      console.log('popstate added', online, location);

      window.addEventListener('popstate', (e) => {
        e.preventDefault();
        console.debug('location', location);
        dispatch(push(location));
      });
    }

    return () => {
      console.log('popstate removed', online, location);

      window.removeEventListener('popstate', (e) => {
        e.preventDefault();
        console.debug('location', location);
        dispatch(push(location));
      });
    };
  }, [online]);

  return (
    <ConfigProvider isWebView={online} scheme={scheme}>
      <Router />
    </ConfigProvider>
  );
});

export default App;
