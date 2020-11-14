import React from 'react';
import { View, Panel, Div, PanelHeader } from '@vkontakte/vkui';
import { Offline } from './Offline';
import { SnakbarsErr } from 'modules/snaks';
import { useDispatch, useSelector } from 'react-redux';
import { getMainView } from 'core/selectors/main';
import { useViewChange } from 'core/hooks';
import { AppDispatchActions, MainView } from 'core/models';
import { goBack } from 'connected-react-router';

export const Main = React.memo(() => {
  const activePanel = useSelector(getMainView);
  const dispatch = useDispatch<AppDispatchActions>();
  const { goBack: handleBack, goForward, history } = useViewChange(MainView, 'Home', true);

  const swipeBack = React.useCallback(() => {
    handleBack();
    dispatch(goBack());
  }, [handleBack, dispatch]);

  return (
    <>
      <View activePanel={activePanel} history={history} onSwipeBack={swipeBack}>
        <Panel id={MainView.Home}>
          <PanelHeader separator={false} />
          <Div>kek</Div>
        </Panel>
        <Panel id={MainView.Offline}>
          <Offline />
        </Panel>
      </View>
      <SnakbarsErr />
    </>
  );
});
