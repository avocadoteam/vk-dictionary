import { FetchingDataType, FetchingStateName, FetchingStatus, SearchResult } from 'core/models';
import { createSelector } from 'reselect';
import { getStateUi } from './common';
import { getSelectedWordId } from './word';

const getUserFavouritesDataState = createSelector(
  getStateUi,
  (ui) =>
    (ui.fetchingDatas[FetchingStateName.UserFavourites] ?? {}) as FetchingDataType<SearchResult[]>
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
