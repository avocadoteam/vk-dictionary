import { AppDispatchActions, FetchingStateName } from 'core/models';
import { isThemeDrak } from 'core/selectors/common';
import { hasAtLeastOnePhoto } from 'core/selectors/photos';
import { getSelectedCardData, isWordNonExists } from 'core/selectors/word';
import { iOS } from 'core/utils';
import { normalizeText } from 'core/utils/formats';
import { If } from 'modules/atoms';
import React from 'react';
import { StyleFunction, useFela } from 'react-fela';
import { useDispatch, useSelector } from 'react-redux';
import { WordMenu } from './WordMenu';

export const WordCard = React.memo(() => {
  const data = useSelector(getSelectedCardData);
  const dark = useSelector(isThemeDrak);
  const hasPhotos = useSelector(hasAtLeastOnePhoto);
  const isEmpty = useSelector(isWordNonExists);
  const { css } = useFela({ dark, hasPhotos });
  const dispatch = useDispatch<AppDispatchActions>();

  React.useEffect(() => {
    if (isEmpty) {
      dispatch({ type: 'SET_UPDATING_DATA', payload: FetchingStateName.WordInfo });
    }
  }, []);

  return (
    <div
      className={css({
        display: 'flex',
        flexDirection: 'column',
        position: 'absolute',
        width: '100vw',
        height: iOS() ? 'calc(100vh - 100px)' : 'calc(100vh - 56px)',
        zIndex: 2,
        overflow: 'hidden',
      })}
    >
      <If
        is={!isEmpty}
        else={
          <div className={css(textBlur)}>
            <div className={css(textPreview)}>
              <dfn>Такое слово не существует</dfn>
            </div>
          </div>
        }
      >
        <div className={css(textBlur)}>
          <div
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
  '>dfn:first-child': {
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
