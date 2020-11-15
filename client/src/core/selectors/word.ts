import { SearchResult } from 'core/models';
import { createSelector } from 'reselect';
import { getStateUi } from './common';
import { mostFreqExpDictResult, searchExpDictResult } from './search';

export const getSelectedCardData = createSelector(
  getStateUi,
  searchExpDictResult,
  mostFreqExpDictResult,
  ({ selectedWordId }, sData, mfData) =>
    (sData?.find((d) => d.id === selectedWordId) || mfData?.find((d) => d.id === selectedWordId)) ??
    ({} as SearchResult)
);
