import { FetchingDataType, FetchingStateName } from 'core/models';
import { createSelector } from 'reselect';
import { getStateUi } from './common';

const getCheckAdsDataState = createSelector(
  getStateUi,
  (ui) => (ui.fetchingDatas[FetchingStateName.CheckAds] ?? {}) as FetchingDataType<boolean>
);

export const canShowNativeAds = createSelector(getCheckAdsDataState, (can) => can.data);
