import {
  FetchingStateName,
  FetchingDataType,
  WordPhoto,
  WordPhotoOfTheDay,
  FetchingStatus,
} from 'core/models';
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

const getWordPhotos = createSelector(getWordPhotosDataState, (dataState) => dataState.data ?? []);

export const isPhotosUpdating = createSelector(
  getWordPhotosDataState,
  (dataState) => dataState.status === FetchingStatus.Updating
);

export const hasAtLeastOnePhoto = createSelector(getWordPhotos, (photos) => !!photos?.length);
export const getFirstPhoto = createSelector(getWordPhotos, (photos) =>
  photos?.length ? photos[~~(photos.length * Math.random())] ?? {} : ({} as WordPhoto)
);

export const getWordOfTheDay = createSelector(
  getWordOfTheDayDataState,
  (dataState) => dataState.data ?? { photo: {} }
);
