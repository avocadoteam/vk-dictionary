import * as sentry from '@sentry/browser';
import { Severity, User } from '@sentry/types';
import { store } from 'core/store';
import { UserInfo } from '@vkontakte/vk-bridge';
import { appV, isDev } from 'core/models';

export const captureUrlEvent = (message: string, request: sentry.Request = {}) => {
  if (isDev) {
    console.error(message);
  }
  sentry.captureEvent({
    message,
    request,
    level: Severity.Error,
  });
};

const beforeSend: sentry.BrowserOptions['beforeSend'] = (event) => {
  if (!event.message || event.message?.indexOf('ChunkLoadError') !== -1) {
    return null;
  }
  const state = store.getState();
  const { ui } = state;

  event.extra = {
    ...event.extra,
    uiState: ui,
  };

  event.tags = event.tags || {};

  return event;
};

export async function initSentry() {
  return sentry.init({
    dsn: '',
    release: appV.toString(),
    beforeSend,
    enabled: process.env.NODE_ENV === 'production',
    environment: 'production',
    ignoreErrors: [/Non-Error promise rejection captured with keys/i],
  });
}
