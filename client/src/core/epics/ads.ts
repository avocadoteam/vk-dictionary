import {
  AppDispatch,
  AppEpic,
  ATTEMPTS_BEFORE_NEXT,
  BannerData,
  FetchingStateName,
} from 'core/models';
import { getAdsData } from 'core/vk-bridge/ads';
import { ofType } from 'redux-observable';
import { from } from 'rxjs';
import { filter, mergeMap, switchMap } from 'rxjs/operators';
import { safeCombineEpics } from './combine';
import { captureFetchError } from './errors';

const getAdsEpic: AppEpic = (action$, state$) =>
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

const watchBeforeNextEpic: AppEpic = (action$, state$) =>
  action$.pipe(
    ofType('SET_ADS_ATTEMPTS'),
    filter(({ payload }) => payload === 0),
    mergeMap(
      () =>
        [
          {
            type: 'SET_ADS_ATTEMPTS',
            payload: ATTEMPTS_BEFORE_NEXT,
          },
          {
            type: 'SET_UPDATING_DATA',
            payload: FetchingStateName.Ads,
          },
          {
            type: 'SET_ADS',
            payload: true,
          },
        ] as AppDispatch[]
    )
  );

export const adsEpics = safeCombineEpics(getAdsEpic, watchBeforeNextEpic);
