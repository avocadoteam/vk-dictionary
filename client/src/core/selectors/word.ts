import { FetchingDataType, FetchingStateName, FetchingStatus, SearchResult } from 'core/models';
import { createSelector } from 'reselect';
import { getStateUi } from './common';
import { getLocationSubPath } from './router';

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
  getWordInfoData,
  (selectedWordId, wordInfo): SearchResult =>
    wordInfo?.id === selectedWordId ? wordInfo : ({} as SearchResult)
);

export const isWordNonExists = createSelector(
  isWordInfoUpdating,
  getSelectedCardData,
  getSelectedWordId,
  (updating, data, wordId) => !updating && !data.id && wordId
);
