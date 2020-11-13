import React from 'react';
import { Snackbar, Avatar } from '@vkontakte/vkui';
import Icon24ErrorCircle from '@vkontakte/icons/dist/24/error_circle';
import { useSelector, useDispatch } from 'react-redux';
import { getStateUi } from 'core/selectors/common';
import { AppDispatchActions } from 'core/models';
import { useFela } from 'react-fela';

const showDuration = 3500;

export const SnakbarsErr = React.memo(() => {
  const [humanError, setError] = React.useState('');
  const dispatch = useDispatch<AppDispatchActions>();
  const errorsQueue = useSelector(getStateUi).errorsQueue;
  const visible = useSelector(getStateUi).snackVisible;
  const { css } = useFela();

  React.useEffect(() => {
    if (errorsQueue.length > 0 && !visible) {
      setError(errorsQueue[0] ?? '');
      dispatch({
        type: 'SET_SNACK',
        payload: true,
      });
      dispatch({
        type: 'DEQUEUE_ERROR',
        payload: errorsQueue[0],
      });
    }
  }, [errorsQueue, visible]);

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
            <Icon24ErrorCircle fill="#FF4848" width={24} height={24} />
          </Avatar>
        }
        className={css({ zIndex: 105 })}
        duration={showDuration}
      >
        {humanError}
      </Snackbar>
    </>
  );
});
