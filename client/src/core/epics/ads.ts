import { ofType } from 'redux-observable';
import { AppDispatch, FetchingStateName, BannerData, AppEpic } from 'core/models';
import { filter, switchMap, mergeMap } from 'rxjs/operators';
import { from } from 'rxjs';
import { getAdsData } from 'core/vk-bridge/ads';
import { captureFetchError } from './errors';

export const getAdsEpic: AppEpic = (action$, state$) =>
  action$.pipe(
    ofType('SET_UPDATING_DATA'),
    filter(({ payload }) => payload === FetchingStateName.Ads),
    switchMap(() =>
      from(getAdsData).pipe(
        mergeMap((adsData: BannerData) => {
          return [
            {
              type: 'SET_READY_DATA',
              payload: {
                name: FetchingStateName.Ads,
                data: adsData,
              },
            },
          ] as AppDispatch[];
        }),
        captureFetchError(FetchingStateName.Ads)
      )
    )
  );
