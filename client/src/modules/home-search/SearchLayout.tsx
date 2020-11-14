import { Search } from '@vkontakte/vkui';
import { isThemeDrak } from 'core/selectors/common';
import React from 'react';
import { useFela } from 'react-fela';
import { useSelector } from 'react-redux';

export const SearchLayout = React.memo(() => {
  const { css } = useFela();
  const dark = useSelector(isThemeDrak);
  return (
    <div
      className={css({
        boxShadow: '0px 0px 30px -11px rgba(0, 0, 0, 0.03)',
        borderRadius: '35px 35px 0px 0px',
        marginTop: '1rem',
        backgroundColor: dark ? '#2F2F2F' : '#FFFFFF',
        paddingTop: '11px',
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
      <Search after={null} className={css({ backgroundColor: 'transparent' })} />
    </div>
  );
});
