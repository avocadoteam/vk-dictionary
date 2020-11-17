import { Panel, PanelHeader, View } from '@vkontakte/vkui';
import { MainView } from 'core/models';
import { getMainView } from 'core/selectors/main';
import { SearchLayout } from 'modules/home-search';
import { DictGallery } from 'modules/home-slides';
import { SnakbarsErr } from 'modules/snaks';
import { BtnBack, WordCard, WordPhoto } from 'modules/word-card';
import React from 'react';
import { useFela } from 'react-fela';
import { useSelector } from 'react-redux';
import { Offline } from './Offline';

export const Main = React.memo(() => {
  const activePanel = useSelector(getMainView);
  const { css } = useFela();
  return (
    <>
      <View activePanel={activePanel}>
        <Panel id={MainView.Home}>
          <PanelHeader separator={false} />
          <DictGallery />
          <SearchLayout />
        </Panel>
        <Panel id={MainView.Word} className={css({ position: 'relative' })}>
          <WordPhoto>
            <PanelHeader separator={false} left={<BtnBack />} />
            <WordCard />
          </WordPhoto>
        </Panel>
        <Panel id={MainView.Offline}>
          <Offline />
        </Panel>
      </View>
      <SnakbarsErr />
    </>
  );
});
