import { Action, AnyAction } from 'redux';
import { Epic, combineEpics } from 'redux-observable';
import { catchError } from 'rxjs/operators';

export function safeCombineEpics<T extends Action = AnyAction, O extends T = T, S = void, D = {}>(
  ...epics: Epic<T, O, S, D>[]
): Epic<T, O, S, D> {
  const pipeCatchError = (epic: Epic): Epic => (action$, state$, dependencies) =>
    epic(action$, state$, dependencies).pipe(
      catchError((error, caughtObs) => {
        console.error('Uncaught epic error (safe):', error);

        if (dependencies && typeof dependencies.captureException === 'function') {
          dependencies.captureException(error);
        }

        return caughtObs;
      })
    );

  return combineEpics<T, O, S, D>(...epics.map(pipeCatchError));
}
