import { vkBridge } from './instance';
import { TapticNotificationType, TapticVibrationPowerType } from '@vkontakte/vk-bridge';

export const tapticSelected = () => vkBridge.send('VKWebAppTapticSelectionChanged', {});

export const tapticDone = (type: TapticNotificationType) =>
  vkBridge.send('VKWebAppTapticNotificationOccurred', { type });

export const tapticImpact = (style: TapticVibrationPowerType) =>
  vkBridge.send('VKWebAppTapticImpactOccurred', { style });
