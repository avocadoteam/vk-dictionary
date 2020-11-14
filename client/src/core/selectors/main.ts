import { MainView } from 'core/models';
import { createSelector } from 'reselect';
import { getStateUi } from './common';
import { getLocationMainPath } from './router';

export const getMainView = createSelector(getLocationMainPath, getStateUi, (main, ui) => {
  if (!ui.online) {
    return MainView.Offline;
  }
  switch (main) {
    case MainView.Home:
      return MainView.Home;
    case MainView.Word:
      return MainView.Word;
    default:
      return MainView.Home;
  }
});
