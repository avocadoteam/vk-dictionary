import { ofType } from 'redux-observable';
import { AppDispatch, FetchingStateName, AppEpic } from 'core/models';
import { filter, switchMap, mergeMap } from 'rxjs/operators';
import { from } from 'rxjs';
import { getAddToHomeInfo, addToHome } from 'core/vk-bridge/user';
import { captureFetchError, captureFetchErrorWithTaptic } from './errors';
import { safeCombineEpics } from './combine';
import { devTimeout } from './addons';

const getAddToHomeInfoEpic: AppEpic = (action$, state$) =>
  action$.pipe(
    ofType('SET_UPDATING_DATA'),
    filter(({ payload }) => payload === FetchingStateName.AddToHomeInfo),
    switchMap(() =>
      from(getAddToHomeInfo()).pipe(
        devTimeout(),
        mergeMap((data) => {
          return [
            {
              type: 'SET_READY_DATA',
              payload: {
                name: FetchingStateName.AddToHomeInfo,
                data,
              },
            },
          ] as AppDispatch[];
        }),
        captureFetchError(FetchingStateName.AddToHomeInfo)
      )
    )
  );
const setAddToHomeEpic: AppEpic = (action$, state$) =>
  action$.pipe(
    ofType('SET_UPDATING_DATA'),
    filter(({ payload }) => payload === FetchingStateName.AddToHome),
    switchMap(() =>
      from(addToHome()).pipe(
        devTimeout(),
        mergeMap((data) => {
          return [
            {
              type: 'SET_READY_DATA',
              payload: {
                name: FetchingStateName.AddToHome,
                data: data.result,
              },
            },
            {
              type: 'SET_UPDATING_DATA',
              payload: FetchingStateName.AddToHomeInfo,
            },
          ] as AppDispatch[];
        }),
        captureFetchErrorWithTaptic(
          FetchingStateName.AddToHome,
          'Не удалось добавить на главный экран устройства'
        )
      )
    )
  );

export const addToHomeEpics = safeCombineEpics(getAddToHomeInfoEpic, setAddToHomeEpic);
