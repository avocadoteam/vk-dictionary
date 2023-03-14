import { AppearanceSchemeType } from '@vkontakte/vk-bridge';
import { CallHistoryMethodAction, LocationChangeAction, RouterState } from 'connected-react-router';
import { Dispatch } from 'redux';
import { FetchingStateName, FetchingStatus, MainView, SelectedHomeSlide } from './enums';
import { SnackModel } from './snacks';

declare module 'react-redux' {
  export interface DefaultRootState extends AppState {}
}

export type AppState = {
  ui: {
    theme: AppearanceSchemeType;
    fetchingDatas: {
      [key in FetchingStateName]?: {
        status: FetchingStatus;
        data: any;
        error: any;
      };
    };
    mainView: MainView;
    activeModal: 'avoplus' | null;
    notifications: boolean;
    online: boolean;
    isAppUser: boolean;
    snacksQueue: SnackModel[];
    snackVisible: boolean;
    selectedWordId: string;
    selectedHomeSlide: SelectedHomeSlide;
    favouritesSearch: string;
    expDictSearch: string;
    searchHeight: string;
    searchY: number;
    autoSetForward: number;
  };
  router: RouterState;
};

export type AppDispatch =
  | FetchUpdateAction
  | FetchReadyAction
  | FetchErrorAction
  | { type: 'SET_THEME'; payload: AppearanceSchemeType }
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
  | { type: 'TELL_AUTO_SET_FORWARD'; payload: number }
  | { type: 'SET_MAIN_VIEW'; payload: MainView }
  | { type: 'SET_MODAL'; payload: AppState['ui']['activeModal'] }
  | SnackEnqueue
  | SnackDequeue
  | SnackQueue
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

export type SnackEnqueue = { type: 'ENQUEUE_SNACK'; payload: SnackModel };
export type SnackDequeue = { type: 'DEQUEUE_SNACK'; payload: SnackModel };
export type SnackQueue = { type: 'SET_QUEUE_SNACKS'; payload: SnackModel[] };

export type FetchingDataType<T> = {
  status: FetchingStatus;
  data: T;
  error: any;
};

export type FetchResponse<T> = {
  data: T;
};

export type FetchigReadyPayload = { name: FetchingStateName; data: any };
