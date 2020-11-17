import { FetchingStateName, FetchingDataType, WordPhoto } from 'core/models';
import { createSelector } from 'reselect';
import { getStateUi } from './common';

const getWordPhotosDataState = createSelector(
  getStateUi,
  (ui) => (ui.fetchingDatas[FetchingStateName.WordPhotos] ?? {}) as FetchingDataType<WordPhoto[]>
);

export const getWordPhotos = createSelector(
  getWordPhotosDataState,
  (dataState) => dataState.data ?? []
);
