import * as models from 'core/models';
import {
  ATTEMPTS_BEFORE_NEXT,
  ClientTheme,
  FetchingStatus,
  MainView,
  SelectedHomeSlide,
  SnackType,
} from 'core/models';
import { defaultSearchLayoutHeight } from 'core/utils';

export const initialState: models.AppState['ui'] = {
  theme: ClientTheme.Light,
  snacksQueue: [],
  fetchingDatas: {},
  notifications: false,
  online: true,
  isAppUser: true,
  snackVisible: false,
  selectedWordId: '',
  selectedHomeSlide: SelectedHomeSlide.ExpDictionary,
  favouritesSearch: '',
  expDictSearch: '',
  searchHeight: defaultSearchLayoutHeight,
  searchY: 0,
  ads: {
    show: true,
    beforeNext: ATTEMPTS_BEFORE_NEXT,
  },
  autoSetForward: 0,
  mainView: MainView.Home,
  activeModal: null,
};

export const reducer = (
  state = initialState,
  dispatch: models.AppDispatch
): models.AppState['ui'] => {
  switch (dispatch.type) {
    case 'SET_THEME': {
      return {
        ...state,
        theme: dispatch.payload,
      };
    }
    case 'SET_UPDATING_DATA': {
      return {
        ...state,
        fetchingDatas: {
          ...state.fetchingDatas,
          [dispatch.payload]: {
            ...(state.fetchingDatas[dispatch.payload] ?? {}),
            status: FetchingStatus.Updating,
          },
        },
      };
    }
    case 'SET_READY_DATA': {
      return {
        ...state,
        fetchingDatas: {
          ...state.fetchingDatas,
          [dispatch.payload.name]: {
            ...(state.fetchingDatas[dispatch.payload.name] ?? {}),
            status: FetchingStatus.Ready,
            data: dispatch.payload.data,
          },
        },
      };
    }
    case 'SET_ERROR_DATA': {
      return {
        ...state,
        fetchingDatas: {
          ...state.fetchingDatas,
          [dispatch.payload.name]: {
            ...(state.fetchingDatas[dispatch.payload.name] ?? {}),
            status: FetchingStatus.Error,
            error: dispatch.payload.error,
          },
        },
        snacksQueue:
          state.snacksQueue.find((sn) => sn.message === dispatch.payload.error) ||
          (typeof dispatch.payload.error === 'string' &&
            dispatch.payload.error.includes('Cannot load '))
            ? state.snacksQueue
            : [...state.snacksQueue, { message: dispatch.payload.error, type: SnackType.Error }],
      };
    }

    case 'SET_NOTIFICATIONS': {
      return {
        ...state,
        notifications: dispatch.payload,
      };
    }
    case 'SET_APP_CONNECT': {
      return {
        ...state,
        online: dispatch.payload,
      };
    }
    case 'SET_APP_USER': {
      return {
        ...state,
        isAppUser: dispatch.payload,
      };
    }

    case 'ENQUEUE_SNACK': {
      return {
        ...state,
        snacksQueue: state.snacksQueue.find((sn) => sn.message === dispatch.payload.message)
          ? state.snacksQueue
          : [...state.snacksQueue, dispatch.payload],
      };
    }

    case 'DEQUEUE_SNACK': {
      return {
        ...state,
        snacksQueue: state.snacksQueue.filter((e) => e !== dispatch.payload),
      };
    }

    case 'SET_QUEUE_SNACKS': {
      return {
        ...state,
        snacksQueue: dispatch.payload,
      };
    }

    case 'SET_SNACK': {
      return {
        ...state,
        snackVisible: dispatch.payload,
      };
    }
    case 'SET_SELECTED_WORD_ID': {
      return {
        ...state,
        selectedWordId: dispatch.payload,
      };
    }
    case 'SET_HOME_SLIDE': {
      return {
        ...state,
        selectedHomeSlide: dispatch.payload,
      };
    }
    case 'SET_FAVOURITES_Q': {
      return {
        ...state,
        favouritesSearch: dispatch.payload,
      };
    }
    case 'SET_EXP_DICT_Q': {
      return {
        ...state,
        expDictSearch: dispatch.payload,
      };
    }
    case 'SET_SEARCH_HEIGHT': {
      return {
        ...state,
        searchHeight: dispatch.payload,
      };
    }
    case 'SET_SEARCH_Y': {
      return {
        ...state,
        searchY: dispatch.payload,
      };
    }
    case 'SET_ADS': {
      return {
        ...state,
        ads: {
          ...state.ads,
          show: dispatch.payload,
        },
      };
    }
    case 'SET_ADS_ATTEMPTS': {
      return {
        ...state,
        ads: {
          ...state.ads,
          beforeNext: dispatch.payload,
        },
      };
    }
    case 'TELL_AUTO_SET_FORWARD': {
      return {
        ...state,
        autoSetForward: state.autoSetForward + 1,
      };
    }
    case 'SET_MAIN_VIEW': {
      return {
        ...state,
        mainView: dispatch.payload,
      };
    }
    case 'SET_MODAL': {
      return {
        ...state,
        activeModal: dispatch.payload,
      };
    }

    default: {
      return state;
    }
  }
};
