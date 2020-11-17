import { Icon24ChevronLeft, Icon24ShareOutline } from '@vkontakte/icons';
import { Button } from '@vkontakte/vkui';
import { AppDispatchActions, appId, FetchingStateName } from 'core/models';
import { isThemeDrak } from 'core/selectors/common';
import { getWordPhotos } from 'core/selectors/photos';
import { getSelectedCardData } from 'core/selectors/word';
import { vkBridge } from 'core/vk-bridge/instance';
import { If } from 'modules/atoms';
import React from 'react';
import { StyleFunction, useFela } from 'react-fela';
import { useDispatch, useSelector } from 'react-redux';
import { animated, useSprings } from 'react-spring';
// import { useDrag } from 'react-use-gesture';
import { MakeFavourite } from './MakeFavourite';

// const clamp = (num: number, clamp: number, higher: number) =>
//   higher ? Math.min(Math.max(num, clamp), higher) : Math.min(num, clamp);

const normalizeText = (text: string) =>
  text
    .replaceAll('<br>', '<div style="margin: 1rem;"></div>')
    .replaceAll('◊', '')
    .replaceAll('&nbsp;', '');

export const WordCard = React.memo<{ swipeBack: () => void }>(({ swipeBack }) => {
  // const index = React.useRef(0);
  const data = useSelector(getSelectedCardData);
  const dark = useSelector(isThemeDrak);
  const photos = useSelector(getWordPhotos);
  const hasPhotos = !!photos?.length;
  const { css } = useFela({ dark, hasPhotos });
  const dispatch = useDispatch<AppDispatchActions>();

  React.useEffect(() => {
    dispatch({ type: 'SET_UPDATING_DATA', payload: FetchingStateName.WordPhotos });
  }, []);

  React.useEffect(() => {
    if (!data.definition) {
      dispatch({ type: 'SET_UPDATING_DATA', payload: FetchingStateName.WordInfo });
    }
  }, []);

  const shareWord = React.useCallback(() => {
    vkBridge.send('VKWebAppShare', { link: `https://vk.com/app${appId}#${data.id}` });
  }, [data.id]);

  const [springs, set] = useSprings(photos.length, (i) => ({
    x: i * window.innerWidth,
    scale: 1,
    display: 'block',
  }));

  // const bind = useDrag(({ down, movement: [mx], direction: [xDir], distance, cancel }) => {
  //   console.debug(down, mx, xDir, distance);
  //   if (down && distance > window.innerWidth / 2) {
  //     console.debug('fk off');
  //     index.current = clamp(index.current + (xDir > 0 ? -1 : 1), 0, photos.length - 1);
  //     cancel();
  //   }
  //   set((i) => {
  //     if (i < index.current - 1 || i > index.current + 1) return { display: 'none' };
  //     const x = (i - index.current) * window.innerWidth + (down ? mx : 0);
  //     const scale = down ? 1 - distance / window.innerWidth / 2 : 1;
  //     return { x, scale, display: 'block' };
  //   });
  // });

  return (
    <>
      <div className={css({ position: 'relative', height: '100vh', width: '100%', zIndex: 3 })}>
        <div
          className={css({
            display: 'flex',
            flexDirection: 'column',
            position: 'absolute',
            width: '100vw',
            height: '100vh',
            zIndex: 2,
          })}
        >
          <Button
            mode="secondary"
            className={css({
              width: 36,
              height: 36,
              color: hasPhotos ? '#FFFFFF' : '#8C8C8C',
              backgroundColor: hasPhotos ? 'rgba(40, 43, 46, 0.2)' : dark ? '#383838' : '#F4F4F4',
              padding: 0,
              margin: '1rem',
              backdropFilter: 'blur(32px)',
            })}
            onClick={swipeBack}
          >
            <Icon24ChevronLeft width={14} height={14} />
          </Button>
          <div className={css({ padding: '1rem' })}>
            <div
              className={`${css(textPreview)} useMonrope manropeBold`}
              dangerouslySetInnerHTML={{
                __html: normalizeText(data.definition ?? ''),
              }}
            />
          </div>
          <div
            className={css({
              margin: 'auto 1.5rem 2rem auto',
            })}
          >
            <MakeFavourite />
            <Button
              mode="tertiary"
              className={css({
                padding: 0,
              })}
              onClick={shareWord}
            >
              <Icon24ShareOutline
                fill={dark ? 'rgba(255, 255, 255, 0.85)' : '#717171'}
                width={30}
                height={30}
              />
            </Button>
          </div>
        </div>
        <If is={hasPhotos}>
          <animated.div
            className={css({
              position: 'absolute',
              width: '100vw',
              height: '100vh',
              willChange: 'transform',
            })}
          >
            <animated.img
              src={photos[0]?.url}
              style={{ scale: 1 }}
              className={css({
                touchAction: 'none',
                objectFit: 'cover',
                width: '100%',
                height: '100%',
                willChange: 'transform',
                // boxShadow:
                //   '0 62.5px 125px -25px rgba(50, 50, 73, 0.5), 0 37.5px 75px -37.5px rgba(0, 0, 0, 0.6)',
              })}
            />
          </animated.div>
        </If>
      </div>
    </>
  );
});

const textPreview: StyleFunction<{}, { dark: boolean; hasPhotos: boolean }> = ({
  dark,
  hasPhotos,
}) => ({
  '>dfn': {
    display: 'block',
    fontSize: '19px',
    lineHeight: '28px',
    marginBottom: '8px',
    color: hasPhotos || dark ? 'rgba(255, 255, 255, 0.9)' : 'rgba(0, 0, 0, 0.9)',
    textTransform: 'lowercase',
    '>b::after': {
      fontWeight: 600,
      content: '"\\0301"',
      color: hasPhotos || dark ? 'rgba(255, 255, 255, 0.9)' : 'rgba(0, 0, 0, 0.9)',
    },
  },
  '>b::after': {
    fontWeight: 600,
    content: '"\\0301"',
    color: hasPhotos || dark ? 'rgba(255, 255, 255, 0.85)' : 'rgba(0, 0, 0, 0.85)',
  },
  fontSize: '15px',
  lineHeight: '20px',
  letterSpacing: '-0.24px',
  color: hasPhotos || dark ? 'rgba(255, 255, 255, 0.85)' : 'rgba(0, 0, 0, 0.85)',
});
