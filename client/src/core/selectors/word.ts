import { FetchingDataType, FetchingStateName, FetchingStatus, SearchResult } from 'core/models';
import { createSelector } from 'reselect';
import { getStateUi } from './common';
import { getLocationSubPath } from './router';
import { mostFreqExpDictResult, searchExpDictResult } from './search';

export const getSelectedWordId = createSelector(
  getStateUi,
  getLocationSubPath,
  ({ selectedWordId }, subPath) => selectedWordId || subPath
);

const getWordInfoDataState = createSelector(
  getStateUi,
  (ui) => (ui.fetchingDatas[FetchingStateName.WordInfo] ?? {}) as FetchingDataType<SearchResult>
);

const isWordInfoUpdating = createSelector(
  getWordInfoDataState,
  (dataState) => dataState.status === FetchingStatus.Updating
);
const getWordInfoData = createSelector(getWordInfoDataState, (dataState) => dataState.data);

export const getSelectedCardData = createSelector(
  getSelectedWordId,
  searchExpDictResult,
  mostFreqExpDictResult,
  getWordInfoData,
  (selectedWordId, sData, mfData, wordInfo) =>
    sData?.find((d) => d.id === selectedWordId) ||
    mfData?.find((d) => ('id' in d) && d.id === selectedWordId) ||
    (wordInfo?.id === selectedWordId && wordInfo) ||
    ({} as SearchResult)
);
