import { vkBridge } from './instance';
import { store } from 'core/store';
import { ClientTheme } from 'core/models';

// set client theme
vkBridge.subscribe(({ detail: { type, data } }) => {
  if (type === 'VKWebAppUpdateConfig') {
    const schemeAttribute = document.createAttribute('scheme');
    const unknownData: any = data;
    const theme = unknownData.scheme ? unknownData.scheme : 'client_light';
    schemeAttribute.value = theme;
    document.body.attributes.setNamedItem(schemeAttribute);

    store.dispatch({ type: 'SET_THEME', payload: theme });

    if (vkBridge.supports('VKWebAppSetViewSettings')) {
      const isLight = theme !== ClientTheme.Dark;
      vkBridge.send('VKWebAppSetViewSettings', {
        status_bar_style: isLight ? 'dark' : 'light',
        action_bar_color: isLight ? '#ffffff' : '#191919',
      });
    }
  }

  if (type === 'VKWebAppViewRestore') {
    const hashValue = window.location.hash ? Number(window.location.hash.split('#').pop()) : null;
    store.dispatch({
      type: 'SET_HASH',
      payload: !hashValue || isNaN(hashValue) ? null : hashValue,
    });

    if (window.navigator.onLine) {
      store.dispatch({ type: 'SET_APP_CONNECT', payload: true });
    }
  }

  if (type === 'VKWebAppViewHide') {
    store.dispatch({
      type: 'SET_QUEUE_ERROR',
      payload: [],
    });
    store.dispatch({
      type: 'SET_SNACK',
      payload: false,
    });
  }
});

// Init VK  Mini App
vkBridge.send('VKWebAppInit');
