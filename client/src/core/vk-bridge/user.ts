import { vkBridge } from './instance';
import { appId, payToGroupId, premiumPrice, Skeys } from 'core/models';

export const getUserData = () => vkBridge.send('VKWebAppGetUserInfo');

export const getUserStorageKeys = (keys: Skeys[]) =>
  vkBridge.send('VKWebAppStorageGet', {
    keys,
  });

export const setStorageValue = (key: Skeys, value: string) =>
  vkBridge.send('VKWebAppStorageSet', { key, value });

export const buyPremium = () =>
  vkBridge.send('VKWebAppOpenPayForm', {
    app_id: appId,
    action: 'pay-to-group',
    params: { group_id: payToGroupId, amount: premiumPrice },
  });

export const getAddToHomeInfo = () => vkBridge.send('VKWebAppAddToHomeScreenInfo');

export const addToHome = () => vkBridge.send('VKWebAppAddToHomeScreen');
