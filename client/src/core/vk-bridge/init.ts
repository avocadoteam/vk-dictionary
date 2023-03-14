import { AppearanceSchemeType, ChangeFragmentResponse } from '@vkontakte/vk-bridge';
import { FetchingStateName } from 'core/models';
import { store } from 'core/store';
import { vkBridge } from './instance';
import { manualChangeStatusBar } from './theme';

// set client theme
vkBridge.subscribe(({ detail: { type, data } }) => {
  if (type === 'VKWebAppUpdateConfig') {
    const schemeAttribute = document.createAttribute('scheme');
    const unknownData: any = data;
    const theme: AppearanceSchemeType = unknownData.scheme ? unknownData.scheme : 'bright_light';
    schemeAttribute.value =
      theme === 'vkcom_dark' ? 'space_gray' : theme === 'vkcom_light' ? 'bright_light' : theme;
    document.body.attributes.setNamedItem(schemeAttribute);

    store.dispatch({
      type: 'SET_THEME',
      payload:
        theme === 'vkcom_dark' ? 'space_gray' : theme === 'vkcom_light' ? 'bright_light' : theme,
    });

    manualChangeStatusBar(theme === 'bright_light' || theme === 'vkcom_light');
  }

  if (type === 'VKWebAppViewRestore') {
    if (window.navigator.onLine) {
      store.dispatch({ type: 'SET_APP_CONNECT', payload: true });
    }
  }

  if (type === 'VKWebAppChangeFragment') {
    const wordId = (data as ChangeFragmentResponse).location;
    if (wordId) {
      store.dispatch({
        type: 'SET_SELECTED_WORD_ID',
        payload: wordId,
      });
      store.dispatch({ type: 'SET_UPDATING_DATA', payload: FetchingStateName.WordInfo });
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
