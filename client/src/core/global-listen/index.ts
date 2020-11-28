import { getSearch, replace } from 'connected-react-router';
import { MainView } from 'core/models';
import { store } from 'core/store';

export const k = 'k';

window.addEventListener('offline', function (e) {
  console.log('offline');
  store.dispatch({ type: 'SET_APP_CONNECT', payload: false });
  store.dispatch(replace(`/${MainView.Offline}${getSearch(store.getState())}`));
});

window.addEventListener('online', function (e) {
  console.log('online');
  store.dispatch({ type: 'SET_APP_CONNECT', payload: true });
  store.dispatch(replace(`/${MainView.Home}${getSearch(store.getState())}`));

  const wordId = store.getState().ui.selectedWordId;
  if (wordId) {
    store.dispatch({ type: 'SET_SELECTED_WORD_ID', payload: wordId });
  }
});

document.body.addEventListener('touchmove', function (event) {
  event.preventDefault();
});
