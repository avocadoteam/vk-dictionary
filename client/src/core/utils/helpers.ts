import { OS } from '@vkontakte/vkui';
import React from 'react';

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
export function shitAndroid() {
  return (
    window.devicePixelRatio === 3 &&
    navigator.userAgent.includes('Android 7.1.1') &&
    navigator.userAgent.includes('Chrome/51')
  );
}

export function isDifferentLayout() {
  return iOS() || shitAndroid();
}

export const platform = () => (iOS() ? OS.IOS : OS.ANDROID);

export const sortByCreated = <T extends { created: string }>(f: T, n: T) =>
  new Date(n.created).getTime() - new Date(f.created).getTime();

export const clamp = (num: number, clamp: number, higher: number) =>
  higher ? Math.min(Math.max(num, clamp), higher) : Math.min(num, clamp);

export const stopEvents = <T>(e: React.PointerEvent<T> | React.MouseEvent<T, MouseEvent>) => {
  e.preventDefault();
  e.stopPropagation();
};

export const defaultSearchLayoutHeight = isDifferentLayout() ? '56vh' : '60vh';
