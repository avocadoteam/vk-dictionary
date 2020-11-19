import { Search } from '@vkontakte/vkui';
import { AppDispatchActions } from 'core/models';
import { isThemeDrak } from 'core/selectors/common';
import { getFavQ, getUserFavouritesList } from 'core/selectors/favourites';
import { getSearchHeight } from 'core/selectors/search';
import React from 'react';
import { useFela } from 'react-fela';
import { useDispatch, useSelector } from 'react-redux';
import { animated, useChain, useTransition } from 'react-spring';
import { textPreview } from './style';

export const SearchFavourites = React.memo(() => {
  const dark = useSelector(isThemeDrak);
  const { css } = useFela({ dark });
  const query = useSelector(getFavQ);
  const values = useSelector(getUserFavouritesList);
  const parentHeight = useSelector(getSearchHeight);
  const dispatch = useDispatch<AppDispatchActions>();
  const openCard = React.useCallback((payload: string) => {
    dispatch({
      type: 'SET_SELECTED_WORD_ID',
      payload,
    });
  }, []);

  const handleSearch = React.useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    dispatch({
      type: 'SET_FAVOURITES_Q',
      payload: e.target.value,
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
    trail: 200 / values.length,
    key: (v) => v.id,
  });

  useChain([transRef], [0, 0.6]);
  const resultsRender = transition((style, v) => {
    return (
      <animated.div
        style={style}
        className={css({ paddingTop: '20px' })}
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
        className={css({ backgroundColor: 'transparent', padding: '0 15px 1px' })}
        onChange={handleSearch}
        placeholder={'Поиск'}
        value={query}
      />
      <div
        className={css({
          height: `calc(${parentHeight} - 76px)`,
          overflowY: 'scroll',
          maskImage: 'linear-gradient(to bottom, black 80%, transparent 100%)',
          '-webkit-mask-image': 'linear-gradient(to bottom, black 80%, transparent 100%)',
        } as any)}
      >
        {resultsRender}
      </div>
    </>
  );
});
