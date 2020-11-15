import { FetchingDataType, FetchingStateName, FetchingStatus, SearchResult } from 'core/models';
import { createSelector } from 'reselect';
import { getStateUi } from './common';

const getSearchExpDictDataState = createSelector(
  getStateUi,
  (ui) =>
    (ui.fetchingDatas[FetchingStateName.SearchExpDict] ?? {}) as FetchingDataType<SearchResult[]>
);

export const isSearchExpDictUpdating = createSelector(
  getSearchExpDictDataState,
  (dataState) => dataState.status === FetchingStatus.Updating
);

export const searchExpDictResult = createSelector(
  getSearchExpDictDataState,
  (dataState) => dataState.data
);
