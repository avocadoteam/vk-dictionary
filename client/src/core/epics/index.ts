import { combineEpics, Epic } from 'redux-observable';
import { catchError } from 'rxjs/operators';
import { userEpics } from './user';
import { getAdsEpic } from './ads';
import { captureUrlEvent } from 'core/sentry';
import { errMap } from 'core/utils';
import { expDict } from './exp-dict';
import { userFavourite } from './user-favourite';

export const rootEpic: Epic = (action$, store$, dependencies) =>
  combineEpics(
    userEpics,
    getAdsEpic,
    expDict,
    userFavourite
  )(action$, store$, dependencies).pipe(
    catchError((error, source) => {
      captureUrlEvent(`Error in root epic ${errMap(error)}`);
      return source;
    })
  );
