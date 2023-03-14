import { AppDispatch, AppEpic, FetchingStateName } from 'core/models';
import { checkNativeAds } from 'core/vk-bridge/ads';
import { ofType } from 'redux-observable';
import { from } from 'rxjs';
import { filter, mergeMap, switchMap } from 'rxjs/operators';
import { safeCombineEpics } from './combine';
import { captureFetchError } from './errors';

const checkNativeAdsEpic: AppEpic = (action$) =>
  action$.pipe(
    ofType('SET_UPDATING_DATA'),
    filter(({ payload }) => payload === FetchingStateName.CheckAds),
    switchMap(() =>
      from(checkNativeAds()).pipe(
        mergeMap((data) => {
          return [
            {
              type: 'SET_READY_DATA',
              payload: {
                name: FetchingStateName.CheckAds,
                data: data.result,
              },
            },
          ] as AppDispatch[];
        }),
        captureFetchError(FetchingStateName.CheckAds)
      )
    )
  );

export const adsEpics = safeCombineEpics(checkNativeAdsEpic);
