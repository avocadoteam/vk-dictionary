import * as sentry from '@sentry/browser';
import { Severity } from '@sentry/types';
import { appV, isDev } from 'core/models';
import { store } from 'core/store';

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
    dsn: 'https://cf0ca4db8c8a4cffbb39cd5924a0209c@sr.testfriendship.special.vk-apps.com/6',
    release: appV.toString(),
    beforeSend,
    enabled: process.env.NODE_ENV === 'production',
    environment: 'production',
    ignoreErrors: [/Non-Error promise rejection captured with keys/i],
  });
}
