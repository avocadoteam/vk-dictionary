import { vkBridge } from './instance';

export const manualChangeStatusBar = (isLight: boolean) => {
  if (vkBridge.supports('VKWebAppSetViewSettings')) {
    vkBridge.send('VKWebAppSetViewSettings', {
      status_bar_style: isLight ? 'dark' : 'light',
      action_bar_color: isLight ? '#ffffff' : '#000000',
    });
  }
};
