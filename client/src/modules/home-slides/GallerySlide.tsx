import { Text } from '@vkontakte/vkui';
import { isThemeDrak } from 'core/selectors/common';
import React from 'react';
import { useFela } from 'react-fela';
import { useSelector } from 'react-redux';

export const GallerySlide = React.memo<{ title: string }>(({ title }) => {
  const dark = useSelector(isThemeDrak);
  const { css } = useFela();
  return (
    <div className={css({ display: 'flex', justifyContent: 'center' })}>
      <Text
        weight="regular"
        className={`${css({
          fontSize: '20px',
          color: dark ? 'rgba(255, 255, 255, 0.9)' : 'rgba(0, 0, 0, 0.9)',
          lineHeight: '150%',
          margin: 'auto 44px',
          textAlign: 'center',
          justifyContent: 'center',
        })} `}
      >
        {title}
      </Text>
    </div>
  );
});
