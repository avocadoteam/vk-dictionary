import { Search, Spinner } from '@vkontakte/vkui';
import { AppDispatchActions } from 'core/models';
import { isThemeDrak } from 'core/selectors/common';
import {
  getExpDictQ,
  isSearchExpDictUpdating,
  mostFreqExpDictResult,
  searchExpDictResult,
} from 'core/selectors/search';
import { If } from 'modules/atoms';
import React from 'react';
import { useFela } from 'react-fela';
import { useDispatch, useSelector } from 'react-redux';
import { textPreview } from './style';
import { WordDay } from './WordDay';

export const SearchDict = React.memo(() => {
  const dark = useSelector(isThemeDrak);
  const { css } = useFela({ dark });
  const q = useSelector(getExpDictQ);
  const values = useSelector(searchExpDictResult);
  const mostFreqValues = useSelector(mostFreqExpDictResult);
  const updating = useSelector(isSearchExpDictUpdating);
  const dispatch = useDispatch<AppDispatchActions>();

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

  return (
    <>
      <Search
        after={null}
        className={css({ backgroundColor: 'transparent', padding: '8px 15px 1px' })}
        onChange={handleSearch}
        icon={updating ? <Spinner /> : undefined}
        placeholder={'Поиск мин 3 символа'}
        value={q}
      />
      <WordDay />
      <div
        className={css({
          height: 'calc(54vh - 52px - 90px)',
          overflowY: 'scroll',
          maskImage: 'linear-gradient(to bottom, black 95%, transparent 100%)',
          '-webkit-mask-image': 'linear-gradient(to bottom, black 95%, transparent 100%)',
        } as any)}
      >
        <If is={!!q}>
          {values?.map((v) => (
            <div key={v.id} className={css({ padding: '9px 0' })} onClick={() => openCard(v.id)}>
              <div
                className={`${css(textPreview)} useMonrope manropeBold`}
                dangerouslySetInnerHTML={{ __html: v.definition }}
              />
            </div>
          ))}
        </If>
        <If is={!q && !!mostFreqValues}>
          {mostFreqValues?.map((v) => (
            <div key={v.id} className={css({ padding: '9px 0' })} onClick={() => openCard(v.id)}>
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
