import { getSearch } from 'connected-react-router';
import {
  AppDispatch,
  AppEpic,
  FetchingStateName,
  FetchResponse,
  FetchUpdateAction,
  SearchResult,
  WordPhoto,
} from 'core/models';
import {
  getWordInfo,
  getWordPhotos,
  mostExpDictWords,
  searchInExpDict,
} from 'core/operations/exp-dict';
import { getSelectedWordId } from 'core/selectors/word';
import { ofType } from 'redux-observable';
import { from, iif, of } from 'rxjs';
import { debounceTime, filter, map, switchMap } from 'rxjs/operators';
import { safeCombineEpics } from './combine';
import { captureFetchError, captureFetchErrorWithTaptic } from './errors';

const searchExpDictEpic: AppEpic = (action$, state$) =>
  action$.pipe(
    ofType('SET_UPDATING_DATA'),
    filter<FetchUpdateAction>(({ payload }) => payload === FetchingStateName.SearchExpDict),
    debounceTime(1500),
    map(({ params }) => ({
      searchValue: params,
      q: getSearch(state$.value),
    })),
    switchMap(({ searchValue, q }) =>
      iif(
        () => searchValue?.length >= 3,
        searchInExpDict(q, searchValue).pipe(
          switchMap((response) => {
            if (response.ok) {
              return from<Promise<FetchResponse<SearchResult[]>>>(response.json()).pipe(
                switchMap((r) => {
                  return of({
                    type: 'SET_READY_DATA',
                    payload: {
                      name: FetchingStateName.SearchExpDict,
                      data: r?.data ?? [],
                    },
                  } as AppDispatch);
                })
              );
            } else {
              throw new Error(`Http ${response.status} on ${response.url}`);
            }
          }),
          captureFetchErrorWithTaptic(FetchingStateName.SearchExpDict, 'Ошибка при поиске')
        ),
        of({
          type: 'SET_READY_DATA',
          payload: {
            name: FetchingStateName.SearchExpDict,
            data: undefined,
          },
        } as AppDispatch)
      )
    )
  );

const mostFrequentWordsEpic: AppEpic = (action$, state$) =>
  action$.pipe(
    ofType('SET_UPDATING_DATA'),
    filter<FetchUpdateAction>(({ payload }) => payload === FetchingStateName.MostFrequentWords),
    map(() => ({
      q: getSearch(state$.value),
    })),
    switchMap(({ q }) =>
      mostExpDictWords(q).pipe(
        switchMap((response) => {
          if (response.ok) {
            return from<Promise<FetchResponse<SearchResult[]>>>(response.json()).pipe(
              switchMap((r) => {
                return of({
                  type: 'SET_READY_DATA',
                  payload: {
                    name: FetchingStateName.MostFrequentWords,
                    data: r?.data ?? [],
                  },
                } as AppDispatch);
              })
            );
          } else {
            throw new Error(`Http ${response.status} on ${response.url}`);
          }
        }),
        captureFetchError(FetchingStateName.MostFrequentWords)
      )
    )
  );

const getWordPhotoEpic: AppEpic = (action$, state$) =>
  action$.pipe(
    ofType('SET_UPDATING_DATA'),
    filter<FetchUpdateAction>(({ payload }) => payload === FetchingStateName.WordPhotos),
    map(() => ({
      q: getSearch(state$.value),
      wordId: getSelectedWordId(state$.value),
    })),
    filter((a) => !!a.wordId),
    switchMap(({ q, wordId }) =>
      getWordPhotos(q, wordId!).pipe(
        switchMap((response) => {
          if (response.ok) {
            return from<Promise<FetchResponse<WordPhoto[]>>>(response.json()).pipe(
              switchMap((r) => {
                return of({
                  type: 'SET_READY_DATA',
                  payload: {
                    name: FetchingStateName.WordPhotos,
                    data: r?.data ?? [],
                  },
                } as AppDispatch);
              })
            );
          } else {
            throw new Error(`Http ${response.status} on ${response.url}`);
          }
        }),
        captureFetchError(FetchingStateName.WordPhotos)
      )
    )
  );

const getWordInfoEpic: AppEpic = (action$, state$) =>
  action$.pipe(
    ofType('SET_UPDATING_DATA'),
    filter<FetchUpdateAction>(({ payload }) => payload === FetchingStateName.WordInfo),
    map(() => ({
      q: getSearch(state$.value),
      wordId: getSelectedWordId(state$.value),
    })),
    filter((a) => !!a.wordId),
    switchMap(({ q, wordId }) =>
      getWordInfo(q, wordId!).pipe(
        switchMap((response) => {
          if (response.ok) {
            return from<Promise<FetchResponse<SearchResult>>>(response.json()).pipe(
              switchMap((r) => {
                return of({
                  type: 'SET_READY_DATA',
                  payload: {
                    name: FetchingStateName.WordInfo,
                    data: r?.data ?? [],
                  },
                } as AppDispatch);
              })
            );
          } else {
            throw new Error(`Http ${response.status} on ${response.url}`);
          }
        }),
        captureFetchError(FetchingStateName.WordInfo)
      )
    )
  );

export const expDict = safeCombineEpics(
  searchExpDictEpic,
  mostFrequentWordsEpic,
  getWordPhotoEpic,
  getWordInfoEpic
);
