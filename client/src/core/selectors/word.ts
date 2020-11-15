import { SearchResult } from 'core/models';
import { createSelector } from 'reselect';
import { getStateUi } from './common';
import { getLocationSubPath } from './router';
import { mostFreqExpDictResult, searchExpDictResult } from './search';

export const getSelectedWordId = createSelector(
  getStateUi,
  getLocationSubPath,
  ({ selectedWordId }, subPath) => selectedWordId || subPath
);

export const getSelectedCardData = createSelector(
  getSelectedWordId,
  searchExpDictResult,
  mostFreqExpDictResult,
  (selectedWordId, sData, mfData) =>
    sData?.find((d) => d.id === selectedWordId) ??
    mfData?.find((d) => d.id === selectedWordId) ??
    ({} as SearchResult)
);
