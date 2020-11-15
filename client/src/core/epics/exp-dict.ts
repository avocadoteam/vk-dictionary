import {
  AppDispatch,
  AppEpic,
  FetchingStateName,
  FetchResponse,
  FetchUpdateAction,
  SearchResult,
} from 'core/models';
import { searchInExpDict } from 'core/operations/exp-dict';
import { getQToQuery } from 'core/selectors/user';
import { ofType } from 'redux-observable';
import { from, iif, of } from 'rxjs';
import { auditTime, filter, map, switchMap } from 'rxjs/operators';
import { safeCombineEpics } from './combine';
import { captureFetchErrorWithTaptic } from './errors';

const searchExpDictEpic: AppEpic = (action$, state$) =>
  action$.pipe(
    ofType('SET_UPDATING_DATA'),
    filter<FetchUpdateAction>(({ payload }) => payload === FetchingStateName.SearchExpDict),
    auditTime(1500),
    map(({ params }) => ({
      searchValue: params,
      q: getQToQuery(state$.value),
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
                      data: r?.data,
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

export const expDict = safeCombineEpics(searchExpDictEpic);
