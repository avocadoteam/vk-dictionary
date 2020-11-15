import * as models from 'core/models';
import { FetchingStatus, ClientTheme } from 'core/models';

export const initialState: models.AppState['ui'] = {
  theme: ClientTheme.Light,
  errorsQueue: [],
  fetchingDatas: {},
  notifications: false,
  online: true,
  isAppUser: true,
  snackVisible: false,
  selectedWordId: '',
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
        errorsQueue:
          state.errorsQueue.includes(dispatch.payload.error) ||
          (typeof dispatch.payload.error === 'string' &&
            dispatch.payload.error.includes('Cannot load '))
            ? state.errorsQueue
            : [...state.errorsQueue, dispatch.payload.error],
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

    case 'ENQUEUE_ERROR': {
      return {
        ...state,
        errorsQueue: state.errorsQueue.includes(dispatch.payload)
          ? state.errorsQueue
          : [...state.errorsQueue, dispatch.payload],
      };
    }

    case 'DEQUEUE_ERROR': {
      return {
        ...state,
        errorsQueue: state.errorsQueue.filter((e) => e !== dispatch.payload),
      };
    }

    case 'SET_QUEUE_ERROR': {
      return {
        ...state,
        errorsQueue: dispatch.payload,
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

    default: {
      return state;
    }
  }
};
