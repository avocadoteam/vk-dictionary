import { SelectedHomeSlide } from 'core/models';
import { isThemeDrak } from 'core/selectors/common';
import { getSelectedSlide } from 'core/selectors/settings';
import { If } from 'modules/atoms';
import React from 'react';
import { useFela } from 'react-fela';
import { useSelector } from 'react-redux';
import { a, useSpring } from 'react-spring';
import { useDrag } from 'react-use-gesture';
import { SearchDict } from './SearchDict';
import { SearchFavourites } from './SearchFavourites';

const defaultParentHeight = '56vh';

export const SearchLayout = React.memo(() => {
  const [parentHeight, setHeight] = React.useState(defaultParentHeight);
  const dark = useSelector(isThemeDrak);
  const slide = useSelector(getSelectedSlide);
  const { css } = useFela({ dark });
  const sLaRef = React.useRef<HTMLDivElement | null>(null);

  const [{ y, height }, set] = useSpring(() => ({
    y: 0,
    height: defaultParentHeight,
  }));

  const bind = useDrag(
    ({ movement: [, my], direction: [, dy] }) => {
      if (my >= 0.1 || my <= -265) {
        return;
      }

      set({ y: my, onChange: (v) => setHeight(v.height) });
      set({
        height: `calc(${defaultParentHeight} - ${my}px)`,
        immediate: dy < 0,
      });
    },
    {
      initial: () => [0, y.get()],
      filterTaps: true,
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
      ref={sLaRef}
    >
      <div className={css({ padding: '11px 0 8px', height: 'auto', width: '100%' })} {...bind()}>
        <div
          className={css({
            width: '59px',
            height: '6px',
            background: dark ? '#4B4B4B' : '#F8F8F8',
            borderRadius: '23px',
            margin: '0 auto',
          })}
          {...bind()}
        />
      </div>
      <If
        is={slide === SelectedHomeSlide.ExpDictionary}
        fallback={<SearchFavourites parentHeight={parentHeight} />}
      >
        <SearchDict parentHeight={parentHeight} />
      </If>
    </a.div>
  );
});
