import { FetchingDataType, FetchingStateName, FetchingStatus, SearchResult } from 'core/models';
import { createSelector } from 'reselect';
import { getStateUi } from './common';

const getSearchExpDictDataState = createSelector(
  getStateUi,
  (ui) =>
    (ui.fetchingDatas[FetchingStateName.SearchExpDict] ?? {}) as FetchingDataType<SearchResult[]>
);
const getMostFreqExpDictDataState = createSelector(
  getStateUi,
  (ui) =>
    (ui.fetchingDatas[FetchingStateName.MostFrequentWords] ?? {}) as FetchingDataType<
      (SearchResult | { t: 'ads' })[]
    >
);

export const getExpDictQ = createSelector(getStateUi, (ui) => ui.expDictSearch);
export const getSearchHeight = createSelector(getStateUi, (ui) => ui.searchHeight);
export const getSearchY = createSelector(getStateUi, (ui) => ui.searchY);

export const isSearchExpDictUpdating = createSelector(
  getSearchExpDictDataState,
  (dataState) => dataState.status === FetchingStatus.Updating
);
export const isSearchExpDictReady = createSelector(
  getSearchExpDictDataState,
  (dataState) => dataState.status === FetchingStatus.Ready
);

export const searchExpDictResult = createSelector(
  getSearchExpDictDataState,
  (dataState) => dataState.data
);
export const mostFreqExpDictResult = createSelector(
  getMostFreqExpDictDataState,
  (dataState) => dataState.data
);
