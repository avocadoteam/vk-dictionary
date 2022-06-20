import { FavSearchResult, FetchingDataType, FetchingStateName, FetchingStatus } from 'core/models';
import { createSelector } from 'reselect';
import { getStateUi } from './common';
import { isUserPremium } from './user';
import { getSelectedWordId } from './word';

const getUserFavouritesDataState = createSelector(
  getStateUi,
  (ui) =>
    (ui.fetchingDatas[FetchingStateName.UserFavourites] ?? {}) as FetchingDataType<
      FavSearchResult[]
    >
);

const getUserFavouriteToggleDataState = createSelector(
  getStateUi,
  (ui) => (ui.fetchingDatas[FetchingStateName.ToggleFavourite] ?? {}) as FetchingDataType<boolean>
);

export const isUserFavouritesUpdating = createSelector(
  getUserFavouritesDataState,
  getUserFavouriteToggleDataState,
  (userData, toggleData) =>
    userData.status === FetchingStatus.Updating || toggleData.status === FetchingStatus.Updating
);

export const isWordFavourite = createSelector(
  getSelectedWordId,
  getUserFavouritesDataState,
  (wordId, favourites) => !!favourites.data?.find((v) => v.id === wordId)
);

export const getFavQ = createSelector(getStateUi, (ui) => ui.favouritesSearch);

export const getUserFavouritesList = createSelector(
  getUserFavouritesDataState,
  getFavQ,
  (dataState, q) =>
    (dataState.data ?? []).filter(
      (d) =>
        d.definition?.toLowerCase()?.includes(q.toLowerCase()) ||
        d.name?.toLowerCase()?.includes(q.toLowerCase())
    )
);

export const canAddMoreFavourites = createSelector(
  getUserFavouritesDataState,
  isUserPremium,
  (dataSate, premium) => premium || (dataSate.data ?? []).length < 5
);
