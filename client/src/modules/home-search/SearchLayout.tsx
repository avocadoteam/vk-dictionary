import { AppDispatchActions, SelectedHomeSlide } from 'core/models';
import { isThemeDrak } from 'core/selectors/common';
import { getSelectedSlide } from 'core/selectors/settings';
import { defaultSearchLayoutHeight } from 'core/utils';
import { If } from 'modules/atoms';
import React from 'react';
import { useFela } from 'react-fela';
import { useDispatch, useSelector } from 'react-redux';
import { a, useSpring } from 'react-spring';
import { useDrag } from 'react-use-gesture';
import { SearchDict } from './SearchDict';
import { SearchFavourites } from './SearchFavourites';

export const SearchLayout = React.memo(() => {
  const dark = useSelector(isThemeDrak);
  const slide = useSelector(getSelectedSlide);
  const { css } = useFela({ dark });
  const dispatch = useDispatch<AppDispatchActions>();

  const changeHeight = React.useCallback((payload: string) => {
    dispatch({ type: 'TRIGGER_SEARCH_HEIGHT', payload });
  }, []);

  const [{ y, height }, set] = useSpring(() => ({
    y: 0,
    height: defaultSearchLayoutHeight,
  }));

  const bind = useDrag(
    ({ movement: [, my] }) => {
      if (my >= 0.1 || my <= -265) {
        return;
      }

      set({
        y: my,
        onChange: (v) => changeHeight(v.height),
        immediate: true,
        height: `calc(${defaultSearchLayoutHeight} - ${my}px)`,
      });
    },
    {
      initial: () => [0, y.get()],
      delay: 1000,
    }
  );

  return (
    <a.div
      className={css({
        boxShadow: '0px 0px 30px -11px rgba(0, 0, 0, 0.3)',
        borderRadius: '35px 35px 0px 0px',
        marginTop: '1rem',
        backgroundColor: dark ? '#2F2F2F' : '#FFFFFF',
        overflow: 'hidden',
      })}
      style={{ display: 'block', height, y } as any}
      {...bind()}
    >
      <div className={css({ padding: '11px 0 8px', height: 'auto', width: '100%' })}>
        <div
          className={css({
            width: '59px',
            height: '6px',
            background: dark ? '#4B4B4B' : '#F8F8F8',
            borderRadius: '23px',
            margin: '0 auto',
          })}
        />
      </div>
      <If is={slide === SelectedHomeSlide.ExpDictionary} fallback={<SearchFavourites />}>
        <SearchDict />
      </If>
    </a.div>
  );
});
