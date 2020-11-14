import { Skeys } from 'core/models';
import { vkBridge } from './instance';

export const getUserStorageKeys = (keys: Skeys[]) =>
  vkBridge.send('VKWebAppStorageGet', {
    keys,
  });

export const setStorageValue = (key: Skeys, value: string) =>
  vkBridge.send('VKWebAppStorageSet', { key, value });
