import { vkBridge } from 'core/vk-bridge/instance';
import { useEffect } from 'react';

export const useAdsBanner = () => {
  useEffect(() => {
    vkBridge.send('VKWebAppShowBannerAd' as any, {
      banner_location: 'bottom',
    });

    return () => {
      vkBridge.send('VKWebAppHideBannerAd' as any);
    };
  }, []);
};
