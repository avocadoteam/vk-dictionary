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

export const hasAtLeastOnePhoto = createSelector(getWordPhotos, (photos) => !!photos?.length);
export const getFirstPhoto = createSelector(getWordPhotos, (photos) => photos[0] ?? {});

export const getWordOfTheDay = createSelector(
  getWordOfTheDayDataState,
  (dataState) => dataState.data ?? { photo: {} }
);
