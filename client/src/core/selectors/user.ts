import { createSelector } from 'reselect';
import { getStateUi } from './common';
import { FetchingStateName, FetchingDataType, FetchingStatus } from 'core/models';
import { UserInfo } from '@vkontakte/vk-bridge';
import { getLocationUserId } from './router';

const getUserDataState = createSelector(
  getStateUi,
  (ui) => (ui.fetchingDatas[FetchingStateName.User] ?? {}) as FetchingDataType<UserInfo>
);

const getUserSKeysDataState = createSelector(
  getStateUi,
  (ui) => (ui.fetchingDatas[FetchingStateName.UserSKeys] ?? {}) as FetchingDataType<undefined>
);

export const isUserSKeysUpdating = createSelector(
  getUserSKeysDataState,
  (userData) => userData.status === FetchingStatus.Updating
);

export const getUserDataStatus = createSelector(getUserDataState, (userData) => userData.status);
export const getUserInfo = createSelector(getUserDataState, (userData) => userData.data);
export const getUserId = createSelector(
  getUserDataState,
  getLocationUserId,
  (userData, locationUserId) => userData.data?.id ?? locationUserId
);

export const getQToQuery = createSelector(getStateUi, (ui) => ui?.initialQuery ?? '');

export const isUserDataUpdating = createSelector(
  getUserDataStatus,
  isUserSKeysUpdating,
  (status, keysStatusUpdating) => status === FetchingStatus.Updating || keysStatusUpdating
);
