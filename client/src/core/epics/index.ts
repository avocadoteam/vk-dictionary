import { combineEpics, Epic } from 'redux-observable';
import { catchError } from 'rxjs/operators';
import { userEpics } from './user';
import { getAdsEpic } from './ads';
import { captureUrlEvent } from 'core/sentry';
import { errMap } from 'core/utils';

export const rootEpic: Epic = (action$, store$, dependencies) =>
  combineEpics(
    userEpics,
    getAdsEpic
  )(action$, store$, dependencies).pipe(
    catchError((error, source) => {
      console.error(error);
      captureUrlEvent(`Error in root epic ${errMap(error)}`);
      return source;
    })
  );
