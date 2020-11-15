import { Search, Spinner } from '@vkontakte/vkui';
import { push } from 'connected-react-router';
import { AppDispatchActions, FetchingStateName, MainView } from 'core/models';
import { isThemeDrak } from 'core/selectors/common';
import {
  isSearchExpDictUpdating,
  mostFreqExpDictResult,
  searchExpDictResult,
} from 'core/selectors/search';
import React from 'react';
import { StyleFunction, useFela } from 'react-fela';
import { useDispatch, useSelector } from 'react-redux';

export const SearchLayout = React.memo<{ goForward: () => void }>(({ goForward }) => {
  const [search, setSearch] = React.useState('');
  const dark = useSelector(isThemeDrak);
  const { css } = useFela({ dark });
  const values = useSelector(searchExpDictResult);
  const mostFreqValues = useSelector(mostFreqExpDictResult);
  const updating = useSelector(isSearchExpDictUpdating);
  const dispatch = useDispatch<AppDispatchActions>();

  React.useEffect(() => {
    dispatch({ type: 'SET_UPDATING_DATA', payload: FetchingStateName.MostFrequentWords });
  }, []);

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearch(e.target.value);
    dispatch({
      type: 'SET_UPDATING_DATA',
      payload: FetchingStateName.SearchExpDict,
      params: e.target.value,
    });
  };

  const openCard = React.useCallback(
    (payload: string) => {
      dispatch({
        type: 'SET_SELECTED_WORD_ID',
        payload,
      });
      goForward();
      dispatch(push(`/${MainView.Word}`));
    },
    [goForward]
  );

  return (
    <div
      className={css({
        boxShadow: '0px 0px 30px -11px rgba(0, 0, 0, 0.03)',
        borderRadius: '35px 35px 0px 0px',
        marginTop: '1rem',
        backgroundColor: dark ? '#2F2F2F' : '#FFFFFF',
        paddingTop: '11px',
        minHeight: 'calc(63vh - 12px - 56px - 27px)',
      })}
    >
      <div
        className={css({
          width: '59px',
          height: '4px',
          background: dark ? '#4B4B4B' : '#F8F8F8',
          borderRadius: '23px',
          margin: '0 auto',
        })}
      />
      <Search
        after={null}
        className={css({ backgroundColor: 'transparent', padding: '8px 15px' })}
        onChange={handleSearch}
        icon={updating ? <Spinner /> : undefined}
        placeholder={'Поиск мин 3 символа'}
      />
      {search &&
        values?.map((v) => (
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
      {!search && !!mostFreqValues
        ? mostFreqValues.map((v) => (
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
          ))
        : null}
    </div>
  );
});

const textPreview: StyleFunction<{}, { dark: boolean }> = ({ dark }) => ({
  height: 48,
  overflow: 'hidden',
  '>dfn': {
    display: 'block',
    fontSize: '16px',
    lineHeight: '20px',
    letterSpacing: '-0.24px',
    marginBottom: '8px',
    color: dark ? 'rgba(255, 255, 255, 0.8)' : 'rgba(0, 0, 0, 0.8)',
    textTransform: 'lowercase',
    '>b::after': {
      fontWeight: 600,
      content: '"\\0301"',
      color: dark ? 'rgba(255, 255, 255, 0.8)' : 'rgba(0, 0, 0, 0.8)',
    },
  },
  fontSize: '14px',
  lineHeight: '18px',
  letterSpacing: '-0.154px',
  color: dark ? 'rgba(255, 255, 255, 0.35)' : 'rgba(0, 0, 0, 0.35)',
  whiteSpace: 'nowrap',
  textOverflow: 'ellipsis',
  ':active': {
    background: 'linear-gradient(90deg, rgba(0, 0, 0, 0.1) 89.07%, rgba(0, 0, 0, 0) 100%)',
  },
});
