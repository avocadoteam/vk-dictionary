import 'core-js/features/map';
import 'core-js/features/set';
import 'core-js/features/object';
import 'whatwg-fetch';
import 'abortcontroller-polyfill/dist/polyfill-patch-fetch';
import 'promise-polyfill/src/polyfill';
import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import { Provider as Redux } from 'react-redux';
import { store, history } from 'core/store';
import { RendererProvider as Fela } from 'react-fela';
import { ConnectedRouter } from 'connected-react-router';
import { configureFela } from 'core/fela';
import 'core/vk-bridge/init';
import '@vkontakte/vkui/dist/vkui.css';
import 'core/fire-callbacks';
import 'core/global-listen';
import 'assets/css/theme.css';

const felaRenderer = configureFela();

ReactDOM.render(
  <Redux store={store}>
    <Fela renderer={felaRenderer}>
      <ConnectedRouter history={history} noInitialPop>
        <App />
      </ConnectedRouter>
    </Fela>
  </Redux>,
  document.getElementById('root')
);
if (process.env.NODE_ENV === 'development') {
  import('./eruda').then(({ default: eruda }) => {}); //runtime download
}
