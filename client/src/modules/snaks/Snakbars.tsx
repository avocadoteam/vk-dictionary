import React from 'react';
import { Snackbar, Avatar } from '@vkontakte/vkui';
import Icon24ErrorCircle from '@vkontakte/icons/dist/24/error_circle';
import Icon20CheckCircleFillGreen from '@vkontakte/icons/dist/20/check_circle_fill_green';
import { useSelector, useDispatch } from 'react-redux';
import { getStateUi } from 'core/selectors/common';
import { AppDispatchActions, SnackModel, SnackType } from 'core/models';
import { useFela } from 'react-fela';
import { If } from 'modules/atoms';

const showDuration = 3500;

export const Snakbars = React.memo(() => {
  const [snack, setError] = React.useState<SnackModel>({ message: '', type: SnackType.Success });
  const dispatch = useDispatch<AppDispatchActions>();
  const snacksQueue = useSelector(getStateUi).snacksQueue;
  const visible = useSelector(getStateUi).snackVisible;
  const { css } = useFela();

  React.useEffect(() => {
    if (snacksQueue.length > 0 && !visible) {
      setError(snacksQueue[0] ?? { message: '', type: SnackType.Error });
      dispatch({
        type: 'SET_SNACK',
        payload: true,
      });
      dispatch({
        type: 'DEQUEUE_SNACK',
        payload: snacksQueue[0],
      });
    }
  }, [snacksQueue, visible]);

  if (!visible) {
    return null;
  }

  return (
    <>
      <Snackbar
        layout="vertical"
        onClose={() =>
          dispatch({
            type: 'SET_SNACK',
            payload: false,
          })
        }
        before={
          <Avatar size={24}>
            <If
              is={snack.type === SnackType.Error}
              else={<Icon20CheckCircleFillGreen width={24} height={24} />}
            >
              <Icon24ErrorCircle fill="#FF4848" width={24} height={24} />
            </If>
          </Avatar>
        }
        className={css({ zIndex: 105 })}
        duration={showDuration}
      >
        {snack.message}
      </Snackbar>
    </>
  );
});
