import { Panel, PanelHeader, View } from '@vkontakte/vkui';
import { MainView } from 'core/models';
import { isThemeDrak } from 'core/selectors/common';
import { getMainView } from 'core/selectors/main';
import { hasAtLeastOnePhoto } from 'core/selectors/photos';
import { SearchLayout } from 'modules/home-search';
import { DictGallery } from 'modules/home-slides';
import { SnakbarsErr } from 'modules/snaks';
import { BtnBack, WordCard, WordPhoto } from 'modules/word-card';
import React from 'react';
import { StyleFunction, useFela } from 'react-fela';
import { useSelector } from 'react-redux';
import { Offline } from './Offline';

export const Main = React.memo(() => {
  const activePanel = useSelector(getMainView);
  const hasPhotos = useSelector(hasAtLeastOnePhoto);
  const dark = useSelector(isThemeDrak);
  const { css } = useFela({ hasPhotos, dark });
  return (
    <>
      <View activePanel={activePanel}>
        <Panel id={MainView.Home}>
          <PanelHeader separator={false} />
          <DictGallery />
          <SearchLayout />
        </Panel>
        <Panel id={MainView.Word} className={css(panelStyle)}>
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

export const panelStyle: StyleFunction<{}, { dark: boolean; hasPhotos: boolean }> = ({
  hasPhotos,
  dark,
}) => ({
  position: 'relative',
  '>.Panel__in': {
    backgroundColor: !hasPhotos ? undefined : dark ? '#000' : '#fff',
  },
});
