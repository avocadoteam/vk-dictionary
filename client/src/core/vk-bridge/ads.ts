import { EAdsFormats } from '@vkontakte/vk-bridge';
import { vkBridge } from './instance';

export const checkNativeAds = () =>
  vkBridge.send('VKWebAppCheckNativeAds', { ad_format: EAdsFormats.INTERSTITIAL });
