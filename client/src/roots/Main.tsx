import { Panel, PanelHeader, View } from '@vkontakte/vkui';
import { goBack } from 'connected-react-router';
import { AppDispatchActions, MainView } from 'core/models';
import { getMainView } from 'core/selectors/main';
import { SearchLayout } from 'modules/home-search';
import { DictGallery } from 'modules/home-slides';
import { SnakbarsErr } from 'modules/snaks';
import { WordCard } from 'modules/word-card';
import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Offline } from './Offline';

export const Main = React.memo(() => {
  const activePanel = useSelector(getMainView);
  const dispatch = useDispatch<AppDispatchActions>();

  const swipeBack = React.useCallback(() => {
    dispatch(goBack());
  }, [dispatch]);

  return (
    <>
      <View activePanel={activePanel} >
        <Panel id={MainView.Home}>
          <PanelHeader separator={false} />
          <DictGallery />
          <SearchLayout />
        </Panel>
        <Panel id={MainView.Word}>
          <WordCard swipeBack={swipeBack} />
        </Panel>
        <Panel id={MainView.Offline}>
          <Offline />
        </Panel>
      </View>
      <SnakbarsErr />
    </>
  );
});
