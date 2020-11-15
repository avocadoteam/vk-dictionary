import { getSearch } from 'connected-react-router';
import {
  AppDispatch,
  AppEpic,
  FetchingStateName,
  FetchResponse,
  FetchUpdateAction,
  SearchResult,
} from 'core/models';
import { getUserFavourites, setUserFavourite } from 'core/operations/user-favourite';
import { ofType } from 'redux-observable';
import { concat, from, of } from 'rxjs';
import { filter, map, switchMap } from 'rxjs/operators';
import { safeCombineEpics } from './combine';
import { captureFetchError, captureFetchErrorWithTaptic } from './errors';

const toggleUserFavouriteEpic: AppEpic = (action$, state$) =>
  action$.pipe(
    ofType('SET_UPDATING_DATA'),
    filter<FetchUpdateAction>(
      ({ payload, params }) => payload === FetchingStateName.ToggleFavourite && params
    ),
    map(({ params }) => ({
      wordId: params,
      q: getSearch(state$.value),
    })),
    switchMap(({ wordId, q }) =>
      setUserFavourite(q, wordId).pipe(
        switchMap((response) => {
          if (response.ok) {
            return from<Promise<FetchResponse<boolean>>>(response.json()).pipe(
              switchMap((r) => {
                return concat(
                  of({
                    type: 'SET_READY_DATA',
                    payload: {
                      name: FetchingStateName.ToggleFavourite,
                      data: r?.data ?? false,
                    },
                  } as AppDispatch),
                  of({
                    type: 'SET_UPDATING_DATA',
                    payload: FetchingStateName.UserFavourites,
                  } as AppDispatch)
                );
              })
            );
          } else {
            throw new Error(`Http ${response.status} on ${response.url}`);
          }
        }),
        captureFetchErrorWithTaptic(
          FetchingStateName.ToggleFavourite,
          'Не получилось добавить в закладки'
        )
      )
    )
  );

const getAllFavouritesEpic: AppEpic = (action$, state$) =>
  action$.pipe(
    ofType('SET_UPDATING_DATA'),
    filter<FetchUpdateAction>(({ payload }) => payload === FetchingStateName.UserFavourites),
    map(() => ({
      q: getSearch(state$.value),
    })),
    switchMap(({ q }) =>
      getUserFavourites(q).pipe(
        switchMap((response) => {
          if (response.ok) {
            return from<Promise<FetchResponse<SearchResult[]>>>(response.json()).pipe(
              switchMap((r) => {
                return of({
                  type: 'SET_READY_DATA',
                  payload: {
                    name: FetchingStateName.UserFavourites,
                    data: r?.data ?? [],
                  },
                } as AppDispatch);
              })
            );
          } else {
            throw new Error(`Http ${response.status} on ${response.url}`);
          }
        }),
        captureFetchError(FetchingStateName.UserFavourites)
      )
    )
  );

export const userFavourite = safeCombineEpics(toggleUserFavouriteEpic, getAllFavouritesEpic);
