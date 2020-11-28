import { createSelector, createStructuredSelector } from 'reselect';
import { getStateRouter } from './common';
import { matchPath } from 'react-router';
import { AppState } from 'core/models';

export const getLocationNotificationEnabled = createSelector(
  getStateRouter,
  (router) => Number((router?.location as any).query?.vk_are_notifications_enabled) ?? 0
);
export const getLocationUserId = createSelector(
  getStateRouter,
  (router) => Number((router?.location as any).query?.vk_user_id) || 0
);

export const getLocationPathName = createSelector(
  getStateRouter,
  (router) => router?.location.pathname ?? ''
);

export const getFullLocation = createSelector(
  getLocationPathName,
  getStateRouter,
  (path, q) => path + q
);

export const getLocationMainPath = createSelector(getLocationPathName, (pathName) => {
  const match = matchPath<{ main: string }>(pathName, { path: '/:main' });
  return match ? match.params.main : null;
});

export const getLocationSubPath = createSelector(getLocationPathName, (pathName) => {
  const match = matchPath<{ sub: string }>(pathName, { path: '/:main/:sub' });
  return match ? match.params.sub : null;
});

export const getLocationPathes = createStructuredSelector<
  AppState,
  { main: string | null; sub: string | null }
>({
  main: getLocationMainPath,
  sub: getLocationSubPath,
});
