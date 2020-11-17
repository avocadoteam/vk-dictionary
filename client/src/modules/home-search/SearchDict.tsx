import { Search, Spinner } from '@vkontakte/vkui';
import { AppDispatchActions, FetchingStateName } from 'core/models';
import { isThemeDrak } from 'core/selectors/common';
import {
  isSearchExpDictUpdating,
  mostFreqExpDictResult,
  searchExpDictResult,
} from 'core/selectors/search';
import { If } from 'modules/atoms';
import React from 'react';
import { useFela } from 'react-fela';
import { useDispatch, useSelector } from 'react-redux';
import { textPreview } from './style';

export const SearchDict = React.memo(() => {
  const [search, setSearch] = React.useState('');
  const dark = useSelector(isThemeDrak);
  const { css } = useFela({ dark });
  const values = useSelector(searchExpDictResult);
  const mostFreqValues = useSelector(mostFreqExpDictResult);
  const updating = useSelector(isSearchExpDictUpdating);
  const dispatch = useDispatch<AppDispatchActions>();

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearch(e.target.value);
    dispatch({
      type: 'SET_UPDATING_DATA',
      payload: FetchingStateName.SearchExpDict,
      params: e.target.value,
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
        className={css({ backgroundColor: 'transparent', padding: '8px 15px' })}
        onChange={handleSearch}
        icon={updating ? <Spinner /> : undefined}
        placeholder={'Поиск мин 3 символа'}
      />
      <div
        className={css({
          height: 'calc(54vh - 52px)',
          overflowY: 'scroll',
          maskImage: 'linear-gradient(to bottom, black 95%, transparent 100%)',
          '-webkit-mask-image': 'linear-gradient(to bottom, black 95%, transparent 100%)',
        } as any)}
      >
        <If is={!!search}>
          {values?.map((v) => (
            <div
              key={v.id}
              className={css({ padding: '21px 21px 0 20px' })}
              onClick={() => openCard(v.id)}
            >
              <div
                className={`${css(textPreview)} useMonrope manropeBold`}
                dangerouslySetInnerHTML={{ __html: v.definition }}
              />
            </div>
          ))}
        </If>
        <If is={!search && !!mostFreqValues}>
          {mostFreqValues?.map((v) => (
            <div
              key={v.id}
              className={css({ padding: '21px 21px 0 20px' })}
              onClick={() => openCard(v.id)}
            >
              <div
                className={`${css(textPreview)} useMonrope manropeBold`}
                dangerouslySetInnerHTML={{ __html: v.definition }}
              />
            </div>
          ))}
        </If>
      </div>
    </>
  );
});
