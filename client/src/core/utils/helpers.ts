import { OS } from '@vkontakte/vkui';

export const getOrigin = window.location.origin;

export const errMap = (error: any) =>
  JSON.stringify(error, [
    'message',
    'arguments',
    'type',
    'name',
    'error_type',
    'error_data',
    'statusCode',
    'stack',
  ]);

function iOS() {
  return (
    ['iPad Simulator', 'iPhone Simulator', 'iPod Simulator', 'iPad', 'iPhone', 'iPod'].includes(
      navigator.platform
    ) ||
    // iPad on iOS 13 detection
    (navigator.userAgent.includes('Mac') && 'ontouchend' in document)
  );
}

export const platform = () => (iOS() ? OS.IOS : OS.ANDROID);

export const sortByCreated = <T extends { created: string }>(f: T, n: T) => new Date(n.created).getTime() - new Date(f.created).getTime();