import { getStateUi } from './common';
import { createSelector } from 'reselect';
import { FetchingStateName, FetchingDataType, BannerData } from 'core/models';

const getAdsDataState = createSelector(
  getStateUi,
  (ui) => (ui.fetchingDatas[FetchingStateName.Ads] ?? {}) as FetchingDataType<BannerData>
);

export const getAdsData = createSelector(getAdsDataState, (adsState) => adsState.data);

const getAdsState = createSelector(getStateUi, (ui) => ui.ads);

export const isAdsVisible = createSelector(getAdsState, (ads) => ads.show);

export const getAdsAttemptsBeforeNext = createSelector(getAdsState, (ads) => ads.beforeNext);
