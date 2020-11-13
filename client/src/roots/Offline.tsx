import React from 'react';
import { PanelHeader, Div, Group, Title, Text, Spinner } from '@vkontakte/vkui';
import { AlienOffline } from 'assets/svg/AlienOffline';
import { useFela } from 'react-fela';
import { useSelector, useDispatch } from 'react-redux';
import { getStateUi } from 'core/selectors/common';
import { AppDispatchActions, FetchingStateName } from 'core/models';

export const Offline = React.memo(() => {
  const { css } = useFela();
  const online = useSelector(getStateUi).online;
  const dispatch = useDispatch<AppDispatchActions>();

  React.useEffect(() => {
    if (online) {
      dispatch({ type: 'SET_UPDATING_DATA', payload: FetchingStateName.User });
      dispatch({ type: 'SET_UPDATING_DATA', payload: FetchingStateName.UserSKeys });
    }
  }, [online]);

  return (
    <>
      <PanelHeader separator={false} />
      <Group separator="hide" className={css({ height: '40vh' })}>
        <Div
          className={css({
            display: 'flex',
            flexDirection: 'column',
            height: '100%',
          })}
        >
          <AlienOffline
            className={css({
              display: 'flex',
              marginTop: 'auto',
              marginBottom: '2rem',
              alignSelf: 'center',
            })}
          />
        </Div>
      </Group>
      <Group separator="hide" className={css({ textAlign: 'center' })}>
        <Title weight="bold" level="2" className="useMonrope manropeBold">
          Нет интернета
        </Title>
      </Group>
      <Group separator="hide">
        <Div
          className={css({
            marginBottom: '1.5rem',
            visibility: online ? 'visible' : 'hidden',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          })}
        >
          <Text weight="medium">Пытаемся восстановить соединение</Text>
          <Spinner size="small" className={css({ marginTop: '.5rem' })} />
        </Div>
      </Group>
    </>
  );
});
