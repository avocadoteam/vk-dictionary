import { Icon24ShareOutline } from '@vkontakte/icons';
import { Button } from '@vkontakte/vkui';
import { AppDispatchActions, appId, FetchingStateName } from 'core/models';
import { isThemeDrak } from 'core/selectors/common';
import { getFirstPhoto, hasAtLeastOnePhoto } from 'core/selectors/photos';
import { getSelectedCardData, getSelectedWordId } from 'core/selectors/word';
import { iOS } from 'core/utils';
import { normalizeText } from 'core/utils/formats';
import { vkBridge } from 'core/vk-bridge/instance';
import { If } from 'modules/atoms';
import React from 'react';
import { StyleFunction, useFela } from 'react-fela';
import { useDispatch, useSelector } from 'react-redux';
import { MakeFavourite } from './MakeFavourite';

export const WordCard = React.memo(() => {
  const [show, setShow] = React.useState(false);
  const data = useSelector(getSelectedCardData);
  const id = useSelector(getSelectedWordId);
  const dark = useSelector(isThemeDrak);
  const photo = useSelector(getFirstPhoto);
  const hasPhotos = useSelector(hasAtLeastOnePhoto);
  const { css } = useFela({ dark, hasPhotos });
  const dispatch = useDispatch<AppDispatchActions>();

  React.useEffect(() => {
    if (!data.definition) {
      dispatch({ type: 'SET_UPDATING_DATA', payload: FetchingStateName.WordInfo });
    }
  }, []);

  const shareWord = React.useCallback(() => {
    vkBridge.send('VKWebAppShare', { link: `https://vk.com/app${appId}#${id}` });
  }, [id]);

  return (
    <div
      className={css({
        display: 'flex',
        flexDirection: 'column',
        position: 'absolute',
        width: '100vw',
        height: 'calc(100vh - 79px)',
        zIndex: 2,
        overflow: 'hidden',
      })}
    >
      <div className={css(textBlur)}>
        <div
          className={css(textPreview)}
          dangerouslySetInnerHTML={{
            __html: normalizeText(data.definition ?? ''),
          }}
        />
      </div>

      <div
        className={css({
          margin: `auto 1.5rem ${iOS() ? '2rem' : 0} auto`,
        })}
        onClick={() => setShow(!show)}
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
            fill={hasPhotos || dark ? 'rgba(255, 255, 255, 0.85)' : '#717171'}
            width={30}
            height={30}
          />
        </Button>
      </div>
      <If is={show}>
        <div className={css({ backgroundColor: photo.color, height: '100px' })}>hui</div>
      </If>
    </div>
  );
});

type StyleProps = { dark: boolean; hasPhotos: boolean };

const textPreview: StyleFunction<{}, StyleProps> = ({ dark, hasPhotos }) => ({
  fontFamily: 'Inter',
  fontSize: '15px',
  fontWeight: 'normal',
  lineHeight: '20px',
  letterSpacing: '-0.24px',
  color: hasPhotos
    ? 'rgba(255, 255, 255, 0.75)'
    : dark
    ? 'rgba(255, 255, 255, 0.85)'
    : 'rgba(0, 0, 0, 0.85)',
  '>dfn': {
    fontFamily: `'Manrope VF', Manrope, -apple-system, BlinkMacSystemFont, Roboto, 'Helvetica Neue', sans-serif;`,
    fontStyle: 'normal !important',
    fontWeight: 'bold',
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
    color: hasPhotos
      ? 'rgba(255, 255, 255, 0.75)'
      : dark
      ? 'rgba(255, 255, 255, 0.85)'
      : 'rgba(0, 0, 0, 0.85)',
  },
});

const textBlur: StyleFunction<{}, StyleProps> = ({ hasPhotos }) => ({
  padding: '1rem 1rem 1.5rem',
  maxHeight: hasPhotos ? 'calc(100vh - 160px)' : undefined,
  overflowY: 'scroll',
  maskImage: 'linear-gradient(to bottom, black 95%, transparent 100%)',
  '-webkit-mask-image': 'linear-gradient(to bottom, black 95%, transparent 100%)',
});
