import { Placeholder, Search, Spinner, Text } from '@vkontakte/vkui';
import { AppDispatchActions, SearchResult } from 'core/models';
import { isThemeDrak } from 'core/selectors/common';
import * as sSel from 'core/selectors/search';
import { stopEvents } from 'core/utils';
import { normalizeTextPreview, shapeTextSearch } from 'core/utils/formats';
import { AdsBanner } from 'modules/ads';
import { If } from 'modules/atoms';
import React from 'react';
import { useFela } from 'react-fela';
import { useDispatch, useSelector } from 'react-redux';
import { animated, useChain, useTransition } from 'react-spring';
import { textPreview } from './style';
import { WordDay } from './WordDay';

const adsArr: (SearchResult | { t: 'ads' })[] = [{ t: 'ads' }];

const showFullText = window.screen.width > 320;

export const SearchDict = React.memo<{ openCard: () => void }>(({ openCard: goForward }) => {
  const searchRef = React.useRef<HTMLInputElement | null>(null);
  const dark = useSelector(isThemeDrak);
  const { css } = useFela({ dark });
  const q = useSelector(sSel.getExpDictQ);
  const values = useSelector(sSel.searchExpDictResult);
  const mostFreqValues = useSelector(sSel.mostFreqExpDictResult);
  const updating = useSelector(sSel.isSearchExpDictUpdating);
  const ready = useSelector(sSel.isSearchExpDictReady);
  const parentHeight = useSelector(sSel.getSearchHeight);
  const dispatch = useDispatch<AppDispatchActions>();
  const showEmpty = (!!q && !updating && ready && !values?.length) || (!!q && q.length < 3);

  const handleSearch = React.useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    dispatch({
      type: 'SET_EXP_DICT_Q',
      payload: shapeTextSearch(e.target.value ?? ''),
    });
  }, []);

  const sumbitSearch = React.useCallback(
    (e: React.FormEvent<HTMLFormElement>) => {
      e.preventDefault();
      dispatch({
        type: 'SET_EXP_DICT_Q',
        payload: q,
      });
      searchRef.current?.blur();
    },
    [q]
  );

  const openCard = React.useCallback(
    (payload: string) => {
      goForward();
      dispatch({
        type: 'SET_SELECTED_WORD_ID',
        payload,
      });
    },
    [goForward]
  );

  const transRef = React.useRef<any>();
  const transition = useTransition(values, {
    from: {
      transform: 'scale(0)',
    },
    enter: {
      transform: 'scale(1)',
    },
    ref: transRef,
    unique: true,
    trail: 100 / values?.length ?? 0,
    key: (v) => v.id,
  });

  useChain([transRef], [0, 0.6]);
  const resultsRender = transition((style, v) => {
    return (
      <animated.div
        style={style}
        className={css({ padding: '9px 0' })}
        onClick={() => openCard(v.id)}
      >
        <div
          className={css(textPreview)}
          dangerouslySetInnerHTML={{ __html: normalizeTextPreview(v.definition ?? '') }}
        />
      </animated.div>
    );
  });

  return (
    <>
      <form onSubmit={sumbitSearch}>
        <Search
          after={null}
          className={css({
            backgroundColor: 'transparent',
            padding: '0 15px 1px',
            borderRadius: '18px',
          })}
          onChange={handleSearch}
          icon={updating ? <Spinner /> : undefined}
          placeholder={`Поиск ${showFullText ? 'минимально' : 'мин'} 3 символа`}
          value={q}
          maxLength={35}
          getRef={searchRef}
        />
      </form>
      <WordDay openCard={goForward} />
      <div
        className={css({
          paddingBottom: '4px',
          height: `calc(${parentHeight} - 90px - 90px)`,
          overflowY: 'scroll',
          '-webkit-overflow-scrolling': 'touch',
          maskImage: 'linear-gradient(to bottom, black 90%, transparent 100%)',
          '-webkit-mask-image': 'linear-gradient(to bottom, black 90%, transparent 100%)',
        } as any)}
        onPointerDown={stopEvents}
      >
        <If is={!!q}>{resultsRender}</If>
        <If is={!q && !!mostFreqValues}>
          {adsArr.concat(mostFreqValues ?? []).map((v) =>
            't' in v && v.t === 'ads' ? (
              <AdsBanner key="ads" />
            ) : 'id' in v ? (
              <div key={v.id} className={css({ padding: '9px 0' })} onClick={() => openCard(v.id)}>
                <div
                  className={css(textPreview)}
                  dangerouslySetInnerHTML={{ __html: normalizeTextPreview(v.definition ?? '') }}
                />
              </div>
            ) : null
          )}
        </If>
        <If is={showEmpty}>
          <Placeholder>
            <Text
              weight="medium"
              className={`${css({
                color: dark ? '#FFFFFF' : '#818C99',
                fontSize: '16px',
                lineHeight: '20px',
                letterSpacing: '-0.32px',
                fontStyle: 'normal',
                fontWeight: 'normal',
              })}`}
            >
              Кажется, Вы ввели неправильный запрос.
            </Text>
          </Placeholder>
        </If>
      </div>
    </>
  );
});
