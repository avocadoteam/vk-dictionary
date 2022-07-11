import { vkBridge } from './instance';

export const getAdsData = vkBridge.supports('VKWebAppGetAds' as any)
  ? vkBridge.send('VKWebAppGetAds' as any)
  : Promise.reject();
