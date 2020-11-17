import { FetchingStateName, FetchingDataType, WordPhoto, WordPhotoOfTheDay } from 'core/models';
import { createSelector } from 'reselect';
import { getStateUi } from './common';

const getWordPhotosDataState = createSelector(
  getStateUi,
  (ui) => (ui.fetchingDatas[FetchingStateName.WordPhotos] ?? {}) as FetchingDataType<WordPhoto[]>
);

const getWordOfTheDayDataState = createSelector(
  getStateUi,
  (ui) =>
    (ui.fetchingDatas[FetchingStateName.WordOfDay] ?? {}) as FetchingDataType<WordPhotoOfTheDay>
);

export const getWordPhotos = createSelector(
  getWordPhotosDataState,
  (dataState) => dataState.data ?? []
);
export const getWordOfTheDay = createSelector(
  getWordOfTheDayDataState,
  (dataState) => dataState.data ?? { photo: {} }
);
