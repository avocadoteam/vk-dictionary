import { vkBridge } from './instance';

export const getAdsData = vkBridge.supports('VKWebAppGetAds')
  ? vkBridge.send('VKWebAppGetAds' as any)
  : Promise.reject();
