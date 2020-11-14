import { OS } from '@vkontakte/vkui';
import { platform } from 'core/utils';
import { createSelector, defaultMemoize } from 'reselect';
import { getStateUi } from './common';

export const getNotifications = createSelector(getStateUi, (ui) => ui.notifications);

export const isPlatformIOS = defaultMemoize(() => platform() === OS.IOS);
