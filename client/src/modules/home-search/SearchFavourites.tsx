import { Search } from '@vkontakte/vkui';
import { AppDispatchActions } from 'core/models';
import { isThemeDrak } from 'core/selectors/common';
import { getFavQ, getUserFavouritesList } from 'core/selectors/favourites';
import React from 'react';
import { useFela } from 'react-fela';
import { useDispatch, useSelector } from 'react-redux';
import { textPreview } from './style';

export const SearchFavourites = React.memo(() => {
  const dark = useSelector(isThemeDrak);
  const { css } = useFela({ dark });
  const query = useSelector(getFavQ);
  const values = useSelector(getUserFavouritesList);
  const dispatch = useDispatch<AppDispatchActions>();

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    dispatch({
      type: 'SET_FAVOURITES_Q',
      payload: e.target.value,
    });
  };

  const openCard = React.useCallback((payload: string) => {
    dispatch({
      type: 'SET_SELECTED_WORD_ID',
      payload,
    });
  }, []);

  return (
    <>
      <Search
        after={null}
        className={css({ backgroundColor: 'transparent', padding: '8px 15px 1px' })}
        onChange={handleSearch}
        placeholder={'Поиск'}
        value={query}
      />
      <div
        className={css({
          height: 'calc(54vh - 52px)',
          overflowY: 'scroll',
          maskImage: 'linear-gradient(to bottom, black 95%, transparent 100%)',
          '-webkit-mask-image': 'linear-gradient(to bottom, black 95%, transparent 100%)',
        } as any)}
      >
        {values.map((v) => (
          <div
            key={v.id}
            className={css({ paddingTop: '20px' })}
            onClick={() => openCard(v.id)}
          >
            <div
              className={`${css(textPreview)} useMonrope manropeBold`}
              dangerouslySetInnerHTML={{ __html: v.definition }}
            />
          </div>
        ))}
      </div>
    </>
  );
});
