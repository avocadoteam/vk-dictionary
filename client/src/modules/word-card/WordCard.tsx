import { Placeholder, Text } from '@vkontakte/vkui';
import { AppDispatchActions, FetchingStateName } from 'core/models';
import { isThemeDrak } from 'core/selectors/common';
import { hasAtLeastOnePhoto } from 'core/selectors/photos';
import { getSelectedCardData, isWordNonExists } from 'core/selectors/word';
import { isDifferentLayout } from 'core/utils';
import { normalizeText } from 'core/utils/formats';
import { useAdsBanner } from 'modules/ads/useAdsBanner';
import { useCheckNativeAds } from 'modules/ads/useNativeAds';
import { If } from 'modules/atoms';
import React from 'react';
import { StyleFunction, useFela } from 'react-fela';
import { useDispatch, useSelector } from 'react-redux';
import { WordMenu } from './WordMenu';

export const WordCard = React.memo<{ pushed: number }>(({ pushed }) => {
  const data = useSelector(getSelectedCardData);
  const dark = useSelector(isThemeDrak);
  const hasPhotos = useSelector(hasAtLeastOnePhoto);
  const isEmpty = useSelector(isWordNonExists);
  const { css } = useFela({ dark, hasPhotos });
  const dispatch = useDispatch<AppDispatchActions>();
  const textRef = React.useRef<HTMLDivElement | null>(null);
  const containerRef = React.useRef<HTMLDivElement | null>(null);
  const definitionRef = React.useRef<HTMLDivElement | null>(null);

  useAdsBanner();
  useCheckNativeAds();

  React.useEffect(() => {
    if (isEmpty) {
      dispatch({ type: 'SET_UPDATING_DATA', payload: FetchingStateName.WordInfo });
    }
  }, []);

  React.useEffect(() => {
    if (pushed && textRef.current) {
      textRef.current.scrollTo({ top: 0, behavior: 'smooth' });
    }
  }, [pushed, textRef]);

  React.useEffect(() => {
    if (containerRef.current) {
      setTimeout(() => containerRef.current?.click(), 200);
    }
  }, []);

  React.useEffect(() => {
    if (data.definition && definitionRef.current && definitionRef.current.childNodes) {
      definitionRef.current.childNodes.forEach((e) => {
        const span = e as HTMLSpanElement;
        if (span.id?.includes('next-')) {
          span.addEventListener('click', () => {
            const [, wordId] = span.id.split('-');
            dispatch({ type: 'SET_SELECTED_WORD_ID', payload: wordId });
            dispatch({ type: 'SET_UPDATING_DATA', payload: FetchingStateName.WordInfo });
            dispatch({ type: 'SET_UPDATING_DATA', payload: FetchingStateName.WordPhotos });
          });
        }
      });
    }
  }, [data.definition, definitionRef]);

  return (
    <div
      className={css({
        display: 'flex',
        flexDirection: 'column',
        position: 'absolute',
        width: '100vw',
        height: isDifferentLayout() ? 'calc(100vh - 95px)' : 'calc(100vh - 56px)',
        zIndex: 2,
        overflow: 'hidden',
      })}
      ref={containerRef}
    >
      <If
        is={!isEmpty}
        else={
          <Placeholder
            className={css({ margin: '70% 0' })}
            header={
              <Text
                weight="medium"
                className={`${css({
                  color: dark ? 'rgba(255, 255, 255, 0.75)' : 'rgba(0, 0, 0, 0.75)',
                  fontSize: '19px',
                  lineHeight: '24px',
                  letterSpacing: '0.38px',
                })} usePRO`}
              >
                Такого слова нет
              </Text>
            }
          >
            <Text
              weight="medium"
              className={`${css({
                color: '#808080',
                fontSize: '16px',
                lineHeight: '20px',
                letterSpacing: '-0.32px',
                fontStyle: 'normal',
                fontWeight: 'normal',
              })} usePRO`}
            >
              Мы не смогли ничего найти.
            </Text>
          </Placeholder>
        }
      >
        <div className={css(textBlur)} ref={textRef}>
          <div
            ref={definitionRef}
            className={css(textPreview)}
            dangerouslySetInnerHTML={{
              __html: normalizeText(data.definition ?? ''),
            }}
          />
        </div>
        <WordMenu />
      </If>
    </div>
  );
});

type StyleProps = { dark: boolean; hasPhotos: boolean };

const textPreview: StyleFunction<{}, StyleProps> = ({ dark, hasPhotos }) => ({
  fontSize: '15px',
  fontWeight: 'normal',
  lineHeight: '20px',
  letterSpacing: '-0.24px',
  color: hasPhotos
    ? 'rgba(255, 255, 255, 0.75)'
    : dark
    ? 'rgba(255, 255, 255, 0.85)'
    : 'rgba(0, 0, 0, 0.85)',
  '>dfn:first-child': {
    letterSpacing: '1px',
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
  maxHeight: hasPhotos ? 'calc(100vh - 170px)' : undefined,
  overflowY: 'scroll',
  maskImage: 'linear-gradient(to bottom, black 95%, transparent 100%)',
  '-webkit-mask-image': 'linear-gradient(to bottom, black 95%, transparent 100%)',
});
