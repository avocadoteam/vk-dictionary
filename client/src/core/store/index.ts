import { combineReducers, createStore, ReducersMapObject, Store, applyMiddleware } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import { reducer as uiReducer, initialState } from 'core/reducers/main';
import { AppState, AppDispatch } from 'core/models';
import { createBrowserHistory } from 'history';
import { connectRouter } from 'connected-react-router';
import { routerMiddleware } from 'connected-react-router';
import { createEpicMiddleware } from 'redux-observable';
import { rootEpic } from 'core/epics';
import * as sentry from '@sentry/browser';

const epicMiddleware = createEpicMiddleware({
  dependencies: {
    captureException: (exception: any) => {
      return sentry.captureException(exception);
    }
  }
});

export const history = createBrowserHistory();

const rootReducerMap: ReducersMapObject<AppState, AppDispatch> = {
  ui: uiReducer,
  router: connectRouter(history) as any,
};

export const store: Store<AppState, AppDispatch> = createStore<
  AppState,
  AppDispatch,
  unknown,
  unknown
>(
  combineReducers(rootReducerMap),
  { ui: initialState } as any,
  composeWithDevTools(applyMiddleware(routerMiddleware(history), epicMiddleware))
);

epicMiddleware.run(rootEpic);
