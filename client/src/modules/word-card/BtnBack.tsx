import { Icon24ChevronLeft } from '@vkontakte/icons';
import { Button } from '@vkontakte/vkui';
import { goBack } from 'connected-react-router';
import { AppDispatchActions } from 'core/models';
import { isThemeDrak } from 'core/selectors/common';
import { hasAtLeastOnePhoto } from 'core/selectors/photos';
import React from 'react';
import { useFela } from 'react-fela';
import { useDispatch, useSelector } from 'react-redux';

export const BtnBack = React.memo(() => {
  const dispatch = useDispatch<AppDispatchActions>();
  const { css } = useFela();
  const dark = useSelector(isThemeDrak);
  const hasPhotos = useSelector(hasAtLeastOnePhoto);

  const swipeBack = React.useCallback(() => {
    dispatch(goBack());
  }, [dispatch]);
  return (
    <Button
      mode="secondary"
      className={css({
        width: 36,
        height: 36,
        color: hasPhotos ? '#FFFFFF' : '#8C8C8C',
        backgroundColor: hasPhotos ? 'rgba(40, 43, 46, 0.2)' : dark ? '#383838' : '#F4F4F4',
        padding: 0,
        marginLeft: '.5rem',
        backdropFilter: hasPhotos ? 'blur(32px)' : undefined,
        borderRadius: '12px',
      })}
      onClick={swipeBack}
    >
      <Icon24ChevronLeft width={14} height={14} />
    </Button>
  );
});
