import { vkBridge } from './instance';
import { store } from 'core/store';
import { ClientTheme } from 'core/models';
import { manualChangeStatusBar } from './theme';

// set client theme
vkBridge.subscribe(({ detail: { type, data } }) => {
  if (type === 'VKWebAppUpdateConfig') {
    const schemeAttribute = document.createAttribute('scheme');
    const unknownData: any = data;
    const theme = unknownData.scheme ? unknownData.scheme : 'client_light';
    schemeAttribute.value = theme;
    document.body.attributes.setNamedItem(schemeAttribute);

    store.dispatch({ type: 'SET_THEME', payload: theme });

    manualChangeStatusBar(theme !== ClientTheme.Dark);
  }

  if (type === 'VKWebAppViewRestore') {
    const wordId = window.location.hash ? window.location.hash.split('#').pop() : null;
    if (wordId) {
      store.dispatch({
        type: 'SET_SELECTED_WORD_ID',
        payload: wordId,
      });
    }

    if (window.navigator.onLine) {
      store.dispatch({ type: 'SET_APP_CONNECT', payload: true });
    }
  }

  if (type === 'VKWebAppViewHide') {
    store.dispatch({
      type: 'SET_QUEUE_SNACKS',
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
