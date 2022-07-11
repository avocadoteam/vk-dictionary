import { MainView } from 'core/models';
import { createSelector } from 'reselect';
import { getStateUi } from './common';
import { getLocationMainPath } from './router';
import { isPlatformIOS } from './settings';

export const getMainView = createSelector(getLocationMainPath, getStateUi, (main, ui) => {
  if (!ui.online) {
    return MainView.Offline;
  }

  if (isPlatformIOS()) {
    return ui.mainView;
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

export const getActiveModal = createSelector(getStateUi, (ui) => ui.activeModal);
