import { BannerData, FetchingDataType, FetchingStateName } from 'core/models';
import { createSelector } from 'reselect';
import { getStateUi } from './common';
import { isUserPremium } from './user';

const getAdsDataState = createSelector(
  getStateUi,
  (ui) => (ui.fetchingDatas[FetchingStateName.Ads] ?? {}) as FetchingDataType<BannerData>
);

export const getAdsData = createSelector(getAdsDataState, (adsState) => adsState.data);

const getAdsState = createSelector(getStateUi, (ui) => ui.ads);

export const isAdsVisible = createSelector(
  getAdsState,
  isUserPremium,
  (ads, premium) => ads.show && !premium
);

export const getAdsAttemptsBeforeNext = createSelector(getAdsState, (ads) => ads.beforeNext);
