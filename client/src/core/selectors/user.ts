import { FetchingDataType, FetchingStateName, FetchingStatus } from 'core/models';
import { createSelector } from 'reselect';
import { getStateUi } from './common';

const getUserSKeysDataState = createSelector(
  getStateUi,
  (ui) => (ui.fetchingDatas[FetchingStateName.UserSKeys] ?? {}) as FetchingDataType<undefined>
);

const getUserPremiumDataState = createSelector(
  getStateUi,
  (ui) => (ui.fetchingDatas[FetchingStateName.Premium] ?? {}) as FetchingDataType<boolean>
);

export const isUserSKeysUpdating = createSelector(
  getUserSKeysDataState,
  (userData) => userData.status === FetchingStatus.Updating
);

export const isUserDataUpdating = createSelector(
  isUserSKeysUpdating,
  (keysStatusUpdating) => keysStatusUpdating
);
export const isUserPremium = createSelector(
  getUserPremiumDataState,
  (dataState) => dataState.data ?? false
);
