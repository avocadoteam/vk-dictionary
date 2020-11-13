import { tapticDone } from 'core/vk-bridge/taptic';
import { TapticNotificationType } from '@vkontakte/vk-bridge';
import { isPlatformIOS } from 'core/selectors/settings';
import { from } from 'rxjs';
import { mergeMap, timeout, tap } from 'rxjs/operators';
import { AppDispatch, Skeys, isDev } from 'core/models';
import { captureErrorAndNothingElse } from './errors';
import { setStorageValue } from 'core/vk-bridge/user';

export const useTapticEpic = (type: TapticNotificationType) =>
  from(isPlatformIOS() ? tapticDone(type) : Promise.resolve()).pipe(
    devTimeout(),
    mergeMap(() => [] as AppDispatch[]),
    captureErrorAndNothingElse('useTapticEpic')
  );

export const setStorageValueEpic = (key: Skeys, value: string) =>
  from(setStorageValue(key, value)).pipe(
    devTimeout(),
    mergeMap(() => [] as AppDispatch[]),
    captureErrorAndNothingElse('setStorageValueEpic')
  );

export const devTimeout = <T>() => (isDev ? timeout<T>(1500) : tap<T>());
