import { FetchingDataType, FetchingStateName, FetchingStatus } from 'core/models';
import { createSelector } from 'reselect';
import { getStateUi } from './common';

const getUserSKeysDataState = createSelector(
  getStateUi,
  (ui) => (ui.fetchingDatas[FetchingStateName.UserSKeys] ?? {}) as FetchingDataType<undefined>
);

export const isUserSKeysUpdating = createSelector(
  getUserSKeysDataState,
  (userData) => userData.status === FetchingStatus.Updating
);

export const isUserDataUpdating = createSelector(
  isUserSKeysUpdating,
  (keysStatusUpdating) => keysStatusUpdating
);
