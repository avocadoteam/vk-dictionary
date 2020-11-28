import { store } from 'core/store';

export const k = 'k';

window.addEventListener('offline', function (e) {
  console.log('offline');
  store.dispatch({ type: 'SET_APP_CONNECT', payload: false });
});

window.addEventListener('online', function (e) {
  console.log('online');
  store.dispatch({ type: 'SET_APP_CONNECT', payload: true });
});

document.body.addEventListener('touchmove', function (event) {
  event.preventDefault();
});
