import { Icon24ShareOutline } from '@vkontakte/icons';
import { Button } from '@vkontakte/vkui';
import { AppDispatchActions, appId, FetchingStateName } from 'core/models';
import { isThemeDrak } from 'core/selectors/common';
import { getWordPhotos } from 'core/selectors/photos';
import { getSelectedCardData } from 'core/selectors/word';
import { normalizeText } from 'core/utils/formats';
import { vkBridge } from 'core/vk-bridge/instance';
import React from 'react';
import { StyleFunction, useFela } from 'react-fela';
import { useDispatch, useSelector } from 'react-redux';
import { MakeFavourite } from './MakeFavourite';

export const WordCard = React.memo(() => {
  const data = useSelector(getSelectedCardData);
  const dark = useSelector(isThemeDrak);
  const photos = useSelector(getWordPhotos);
  const hasPhotos = !!photos?.length;
  const { css } = useFela({ dark, hasPhotos });
  const dispatch = useDispatch<AppDispatchActions>();

  React.useEffect(() => {
    dispatch({ type: 'SET_UPDATING_DATA', payload: FetchingStateName.WordPhotos });
  }, []);

  const shareWord = React.useCallback(() => {
    vkBridge.send('VKWebAppShare', { link: `https://vk.com/app${appId}#${data.id}` });
  }, [data.id]);

  return (
    <div
      className={css({
        display: 'flex',
        flexDirection: 'column',
        position: 'absolute',
        width: '100vw',
        maxHeight: 'calc(100vh - 71px)',
        zIndex: 2,
        overflow: 'hidden',
      })}
    >
      <div className={css(textBlur)}>
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
  );
});

type StyleProps = { dark: boolean; hasPhotos: boolean };

const textPreview: StyleFunction<{}, StyleProps> = ({ dark, hasPhotos }) => ({
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

const textBlur: StyleFunction<{}, StyleProps> = ({ hasPhotos }) => ({
  padding: '1rem 1rem 1.5rem',
  maxHeight: hasPhotos ? 'calc(100vh - 160px)' : undefined,
  overflowY: 'scroll',
  maskImage: 'linear-gradient(to bottom, black 95%, transparent 100%)',
  '-webkit-mask-image': 'linear-gradient(to bottom, black 95%, transparent 100%)',
});
