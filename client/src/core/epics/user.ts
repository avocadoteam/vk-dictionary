import { getHash, getSearch } from 'connected-react-router';
import { AppDispatch, AppEpic, AppUser, FetchingStateName, Skeys } from 'core/models';
import { getLocationNotificationEnabled } from 'core/selectors/router';
import { getUserStorageKeys } from 'core/vk-bridge/user';
import { ofType } from 'redux-observable';
import { from } from 'rxjs';
import { filter, mergeMap, switchMap } from 'rxjs/operators';
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

// const setInitInfo: AppEpic = (action$, state$) =>
//   action$.pipe(
//     // ofType('SET_UPDATING_DATA'),
//     // filter(({ payload }) => payload === FetchingStateName.User),
//     mergeMap(() => {
//       const state = state$.value;
//       const hash = getHash(state$.value);
//       const q = getSearch(state$.value);
//       const hashListGUID = hash ? hash.split('#').pop() : null;
//       const actions: AppDispatch[] = [
//         {
//           type: 'SET_NOTIFICATIONS',
//           payload: !!getLocationNotificationEnabled(state),
//         },
//         {
//           type: 'SET_HASH',
//           payload: hashListGUID ?? null,
//         },
//       ];

//       if (!!q) {
//         actions.push({
//           type: 'SET_INIT_QUERY',
//           payload: q,
//         });
//       }
//       return actions;
//     })
//   );

export const userEpics = safeCombineEpics(getUserSKeysEpic);
