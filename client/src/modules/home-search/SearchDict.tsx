import { Placeholder, Search, Spinner, Text } from '@vkontakte/vkui';
import { AppDispatchActions } from 'core/models';
import { isThemeDrak } from 'core/selectors/common';
import * as sSel from 'core/selectors/search';
import { stopEvents } from 'core/utils';
import { If } from 'modules/atoms';
import React from 'react';
import { useFela } from 'react-fela';
import { useDispatch, useSelector } from 'react-redux';
import { animated, useChain, useTransition } from 'react-spring';
import { textPreview } from './style';
import { WordDay } from './WordDay';

export const SearchDict = React.memo(() => {
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
      payload: e.target.value,
    });
  }, []);

  const openCard = React.useCallback((payload: string) => {
    dispatch({
      type: 'SET_SELECTED_WORD_ID',
      payload,
    });
  }, []);

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
        <div className={css(textPreview)} dangerouslySetInnerHTML={{ __html: v.definition }} />
      </animated.div>
    );
  });

  return (
    <>
      <Search
        after={null}
        className={css({
          backgroundColor: 'transparent',
          padding: '0 15px 1px',
          borderRadius: '18px',
        })}
        onChange={handleSearch}
        icon={updating ? <Spinner /> : undefined}
        placeholder={'Поиск мин 3 символа'}
        value={q}
      />
      <WordDay />
      <div
        className={css({
          paddingBottom: '4px',
          height: `calc(${parentHeight} - 90px - 90px)`,
          overflowY: 'scroll',
          maskImage: 'linear-gradient(to bottom, black 90%, transparent 100%)',
          '-webkit-mask-image': 'linear-gradient(to bottom, black 90%, transparent 100%)',
        } as any)}
        onPointerDown={stopEvents}
      >
        <If is={!!q}>{resultsRender}</If>
        <If is={!q && !!mostFreqValues}>
          {mostFreqValues?.map((v) => (
            <div key={v.id} className={css({ padding: '9px 0' })} onClick={() => openCard(v.id)}>
              <div
                className={css(textPreview)}
                dangerouslySetInnerHTML={{ __html: v.definition }}
              />
            </div>
          ))}
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
