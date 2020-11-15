import { Icon24ChevronLeft, Icon24ShareOutline, Icon20FavoriteOutline } from '@vkontakte/icons';
import { Button } from '@vkontakte/vkui';
import { appId } from 'core/models';
import { isThemeDrak } from 'core/selectors/common';
import { getSelectedCardData } from 'core/selectors/word';
import { vkBridge } from 'core/vk-bridge/instance';
import React from 'react';
import { StyleFunction, useFela } from 'react-fela';
import { useSelector } from 'react-redux';

const normalizeText = (text: string) =>
  text
    .replaceAll('<br>', '<div style="margin: 1rem;"></div>')
    .replaceAll('◊', '')
    .replaceAll('&nbsp;', '');
export const WordCard = React.memo<{ swipeBack: () => void }>(({ swipeBack }) => {
  const data = useSelector(getSelectedCardData);
  const dark = useSelector(isThemeDrak);
  const { css } = useFela({ dark });

  const shareWord = React.useCallback(() => {
    vkBridge.send('VKWebAppShare', { link: `https://vk.com/app${appId}#${data.id}` });
  }, [data.id]);
  return (
    <div className={css({ height: '100vh', display: 'flex', flexDirection: 'column' })}>
      <Button
        mode="secondary"
        className={css({
          width: 36,
          height: 36,
          color: '#8C8C8C',
          backgroundColor: '#F4F4F4',
          padding: 0,
          margin: '1rem',
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
        <Button
          mode="tertiary"
          className={css({
            padding: 0,
            marginRight: '12px',
          })}
        >
          <Icon20FavoriteOutline
            fill={dark ? 'rgba(255, 255, 255, 0.85)' : '#717171'}
            width={30}
            height={30}
          />
        </Button>
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

const textPreview: StyleFunction<{}, { dark: boolean }> = ({ dark }) => ({
  '>dfn': {
    display: 'block',
    fontSize: '19px',
    lineHeight: '28px',
    marginBottom: '8px',
    color: dark ? 'rgba(255, 255, 255, 0.9)' : 'rgba(0, 0, 0, 0.9)',
    textTransform: 'lowercase',
    '>b::after': {
      fontWeight: 600,
      content: '"\\0301"',
      color: dark ? 'rgba(255, 255, 255, 0.9)' : 'rgba(0, 0, 0, 0.9)',
    },
  },
  '>b::after': {
    fontWeight: 600,
    content: '"\\0301"',
    color: dark ? 'rgba(255, 255, 255, 0.85)' : 'rgba(0, 0, 0, 0.85)',
  },
  fontSize: '15px',
  lineHeight: '20px',
  letterSpacing: '-0.24px',
  color: dark ? 'rgba(255, 255, 255, 0.85)' : 'rgba(0, 0, 0, 0.85)',
});
