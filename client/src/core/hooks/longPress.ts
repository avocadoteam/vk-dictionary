import { useCallback, useEffect, useRef } from 'react';

export const useLongPress = <T = Element>(
  onLongPress: (e?: React.MouseEvent<T, MouseEvent> | React.TouchEvent<T>) => void,
  { shouldPreventDefault = false, delay = 500, stop = false } = {}
) => {
  const timeout = useRef<number>();
  const target = useRef<EventTarget>();

  useEffect(() => {
    if (stop) {
      clearTimeout(timeout.current);
    }
  }, [stop]);

  const start = useCallback(
    (e: React.MouseEvent<T, MouseEvent> | React.TouchEvent<T>) => {
      if (shouldPreventDefault && e.target) {
        e.target.addEventListener('touchend', preventDefault, {
          passive: false,
        });
        target.current = e.target;
      }
      timeout.current = (setTimeout(() => {
        onLongPress(e);
      }, delay) as unknown) as number;
    },
    [onLongPress, delay, shouldPreventDefault, stop]
  );

  const clear = useCallback(
    (e: React.MouseEvent<T, MouseEvent> | React.TouchEvent<T>) => {
      timeout.current && clearTimeout(timeout.current);
      if (shouldPreventDefault && target.current) {
        target.current.removeEventListener('touchend', preventDefault);
      }
    },
    [shouldPreventDefault]
  );

  return {
    onMouseDown: (e: React.MouseEvent<T, MouseEvent>) => start(e),
    onTouchStart: (e: React.TouchEvent<T>) => start(e),
    onMouseUp: (e: React.MouseEvent<T, MouseEvent>) => clear(e),
    onMouseLeave: (e: React.MouseEvent<T, MouseEvent>) => clear(e),
    onTouchEnd: (e: React.TouchEvent<T>) => clear(e),
  };
};

const isTouchEvent = (e: Event) => {
  return 'touches' in e;
};

const preventDefault = (e: Event) => {
  if (!isTouchEvent(e)) return;

  if ((e as any).touches.length < 2 && e.preventDefault) {
    e.preventDefault();
  }
};
