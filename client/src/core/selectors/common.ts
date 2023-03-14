import { RouterState } from 'connected-react-router';
import { AppState } from 'core/models';
import { createSelector } from 'reselect';

export const getStateUi = (state: AppState) => state.ui;
export const getStateRouter = (state: AppState) => state.router ?? ({} as RouterState);

export const getTheme = createSelector(getStateUi, (ui) => ui.theme);

export const isAutoSet = createSelector(getStateUi, (ui) => ui.autoSetForward);

export const isThemeDrak = createSelector(
  getTheme,
  (theme) => theme === 'space_gray' || theme === 'vkcom_dark'
);

export const isAppUser = createSelector(getStateUi, (ui) => ui.isAppUser);
