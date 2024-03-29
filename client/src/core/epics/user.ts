import { getHash, getSearch, push } from 'connected-react-router';
import { AppDispatch, AppEpic, AppUser, FetchingStateName, MainView, Skeys } from 'core/models';
import { getMainView } from 'core/selectors/main';
import { getLocationNotificationEnabled } from 'core/selectors/router';
import { isPlatformIOS } from 'core/selectors/settings';
import { getUserStorageKeys } from 'core/vk-bridge/user';
import { ofType } from 'redux-observable';
import { from } from 'rxjs';
import { debounceTime, filter, map, mergeMap, switchMap } from 'rxjs/operators';
import { devTimeout } from './addons';
import { safeCombineEpics } from './combine';
import { captureFetchErrorMoreActions } from './errors';

const getUserSKeysEpic: AppEpic = (action$, state$) =>
  action$.pipe(
    ofType('SET_UPDATING_DATA'),
    filter(({ payload }) => payload === FetchingStateName.UserSKeys),
    switchMap(() =>
      from(getUserStorageKeys([Skeys.appUser])).pipe(
        devTimeout(),
        mergeMap((result) => {
          const isAppUser = result.keys.find((v) => v.key === Skeys.appUser)?.value === AppUser.Yes;
          return [
            {
              type: 'SET_APP_USER',
              payload: isAppUser,
            },
            {
              type: 'SET_READY_DATA',
              payload: {
                name: FetchingStateName.UserSKeys,
                data: undefined,
              },
            },
          ] as AppDispatch[];
        }),
        captureFetchErrorMoreActions(FetchingStateName.UserSKeys, {
          type: 'SET_APP_USER',
          payload: false,
        })
      )
    )
  );

const setInitInfo: AppEpic = (action$, state$) =>
  action$.pipe(
    ofType('SET_UPDATING_DATA'),
    filter(({ payload }) => payload === FetchingStateName.UserSKeys),
    mergeMap(() => {
      const state = state$.value;
      const hash = getHash(state$.value);
      const wordId = hash ? hash.split('#').pop() : null;
      const actions: AppDispatch[] = [
        {
          type: 'SET_NOTIFICATIONS',
          payload: !!getLocationNotificationEnabled(state),
        },
        { type: 'SET_UPDATING_DATA', payload: FetchingStateName.MostFrequentWords },
        { type: 'SET_UPDATING_DATA', payload: FetchingStateName.UserFavourites },
        { type: 'SET_UPDATING_DATA', payload: FetchingStateName.WordOfDay },
        { type: 'SET_UPDATING_DATA', payload: FetchingStateName.Premium },
      ];

      if (wordId) {
        actions.push({
          type: 'SET_SELECTED_WORD_ID',
          payload: wordId,
        });
      }
      return actions;
    })
  );

const watchWordIdFromHashEpic: AppEpic = (action$, state$) =>
  action$.pipe(
    ofType('SET_SELECTED_WORD_ID'),
    filter(({ payload }) => !!payload && getMainView(state$.value) === MainView.Home),
    mergeMap(
      ({ payload }) =>
        [
          isPlatformIOS()
            ? { type: 'SET_MAIN_VIEW', payload: MainView.Word }
            : push(`/${MainView.Word}/${payload}${getSearch(state$.value)}`),
          { type: 'TELL_AUTO_SET_FORWARD' },
        ] as AppDispatch[]
    )
  );

const watchSearchHeightChangeEpic: AppEpic = (action$, state$) =>
  action$.pipe(
    ofType('TRIGGER_SEARCH_HEIGHT'),
    filter(({ payload }) => !!payload),
    debounceTime(200),
    map(({ payload }) => ({ type: 'SET_SEARCH_HEIGHT', payload } as AppDispatch))
  );

export const userEpics = safeCombineEpics(
  getUserSKeysEpic,
  setInitInfo,
  watchWordIdFromHashEpic,
  watchSearchHeightChangeEpic
);
