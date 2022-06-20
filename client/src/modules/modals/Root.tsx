import { ModalPage, ModalPageHeader, ModalRoot } from '@vkontakte/vkui';
import { AppDispatchActions } from 'core/models';
import { getActiveModal } from 'core/selectors/main';
import React, { memo, useCallback } from 'react';
import { useFela } from 'react-fela';
import { useDispatch, useSelector } from 'react-redux';
import { PremiumSub } from './PremiumSub';

export const RootModals = memo(() => {
  const activeModal = useSelector(getActiveModal);
  const dispatch = useDispatch<AppDispatchActions>();
  const { css } = useFela();

  const close = useCallback(() => {
    dispatch({
      type: 'SET_MODAL',
      payload: null,
    });
  }, []);

  return (
    <ModalRoot activeModal={activeModal} onClose={close}>
      <ModalPage
        className={css(modalStyle)}
        id={'avoplus'}
        onClose={close}
        header={<ModalPageHeader />}
      >
        <PremiumSub />
      </ModalPage>
    </ModalRoot>
  );
});

const modalStyle: any = ({}) => ({
  '>div>div.ModalPage__in': {
    padding: '15px 0 0',
  },
});
