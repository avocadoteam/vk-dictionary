import { SelectedHomeSlide } from 'core/models';
import { isThemeDrak } from 'core/selectors/common';
import { getSelectedSlide } from 'core/selectors/settings';
import { If } from 'modules/atoms';
import React from 'react';
import { useFela } from 'react-fela';
import { useSelector } from 'react-redux';
import { SearchDict } from './SearchDict';
import { SearchFavourites } from './SearchFavourites';

export const SearchLayout = React.memo(() => {
  const dark = useSelector(isThemeDrak);
  const slide = useSelector(getSelectedSlide);
  const { css } = useFela({ dark });

  return (
    <div
      className={css({
        boxShadow: '0px 0px 30px -11px rgba(0, 0, 0, 0.03)',
        borderRadius: '35px 35px 0px 0px',
        marginTop: '1rem',
        backgroundColor: dark ? '#2F2F2F' : '#FFFFFF',
        paddingTop: '11px',
        minHeight: 'calc(63vh - 27px - 56px - 27px)',
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
      <If is={slide === SelectedHomeSlide.ExpDictionary} fallback={<SearchFavourites />}>
        <SearchDict />
      </If>
    </div>
  );
});
