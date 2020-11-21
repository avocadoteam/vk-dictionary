import { Dispatch } from 'redux';
import { CallHistoryMethodAction, LocationChangeAction, RouterState } from 'connected-react-router';
import { FetchingStateName, FetchingStatus, SelectedHomeSlide } from './enums';

declare module 'react-redux' {
  export interface DefaultRootState extends AppState {}
}

export type AppState = {
  ui: {
    theme: ClientTheme;
    fetchingDatas: {
      [key in FetchingStateName]?: {
        status: FetchingStatus;
        data: any;
        error: any;
      };
    };
    notifications: boolean;
    online: boolean;
    isAppUser: boolean;
    errorsQueue: string[];
    snackVisible: boolean;
    selectedWordId: string;
    selectedHomeSlide: SelectedHomeSlide;
    favouritesSearch: string
    expDictSearch: string
    searchHeight: string;
    searchY: number;
  };
  router: RouterState;
};

export type AppDispatch =
  | FetchUpdateAction
  | FetchReadyAction
  | FetchErrorAction
  | { type: 'SET_THEME'; payload: ClientTheme }
  | { type: 'SET_NOTIFICATIONS'; payload: boolean }
  | { type: 'SET_APP_CONNECT'; payload: boolean }
  | { type: 'SET_APP_USER'; payload: boolean }
  | { type: 'SET_SNACK'; payload: boolean }
  | { type: 'SET_SELECTED_WORD_ID'; payload: string }
  | { type: 'SET_HOME_SLIDE'; payload: SelectedHomeSlide }
  | { type: 'SET_FAVOURITES_Q'; payload: string }
  | { type: 'SET_EXP_DICT_Q'; payload: string }
  | { type: 'SET_SEARCH_HEIGHT'; payload: string }
  | { type: 'SET_SEARCH_Y'; payload: number }
  | { type: 'TRIGGER_SEARCH_HEIGHT'; payload: string }
  | ErrorEnqueue
  | ErrorDequeue
  | ErrorQueue
  | LocationChangeAction
  | CallHistoryMethodAction;

export type AppDispatchActions = Dispatch<AppDispatch>;

export type FetchReadyAction = { type: 'SET_READY_DATA'; payload: FetchigReadyPayload };
export type FetchUpdateAction = {
  type: 'SET_UPDATING_DATA';
  payload: FetchingStateName;
  params?: any;
};
export type FetchErrorAction = {
  type: 'SET_ERROR_DATA';
  payload: { name: FetchingStateName; error: any };
};

export type ErrorEnqueue = { type: 'ENQUEUE_ERROR'; payload: string };
export type ErrorDequeue = { type: 'DEQUEUE_ERROR'; payload: string };
export type ErrorQueue = { type: 'SET_QUEUE_ERROR'; payload: string[] };

export type FetchingDataType<T> = {
  status: FetchingStatus;
  data: T;
  error: any;
};

export type FetchResponse<T> = {
  data: T;
};

export type FetchigReadyPayload = { name: FetchingStateName; data: any };

export enum ClientTheme {
  oldLight = 'client_light',
  Light = 'bright_light',
  Dark = 'space_gray',
}
