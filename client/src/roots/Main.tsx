import { Panel, PanelHeader, View } from '@vkontakte/vkui';
import { goBack } from 'connected-react-router';
import { useViewChange } from 'core/hooks';
import { AppDispatchActions, MainView } from 'core/models';
import { isAutoSet, isThemeDrak } from 'core/selectors/common';
import { getMainView } from 'core/selectors/main';
import { hasAtLeastOnePhoto } from 'core/selectors/photos';
import { SearchLayout } from 'modules/home-search';
import { DictGallery } from 'modules/home-slides';
import { SnakbarsErr } from 'modules/snaks';
import { BtnBack, WordCard, WordPhoto } from 'modules/word-card';
import React from 'react';
import { StyleFunction, useFela } from 'react-fela';
import { useDispatch, useSelector } from 'react-redux';
import { Offline } from './Offline';

export const Main = React.memo(() => {
  const activePanel = useSelector(getMainView);
  const hasPhotos = useSelector(hasAtLeastOnePhoto);
  const dark = useSelector(isThemeDrak);
  const up = useSelector(isAutoSet);
  const { css } = useFela({ hasPhotos, dark });
  const dispatch = useDispatch<AppDispatchActions>();
  const [pushed, Push] = React.useState(0);

  const { goBack: handleBack, goForward, history } = useViewChange(MainView, 'Home', true);

  React.useEffect(() => {
    if (activePanel === MainView.Word && !history.includes(MainView.Word)) {
      goForward(MainView.Word);
    }
  }, [up]);

  const swipeBack = React.useCallback(() => {
    dispatch({ type: 'SET_SELECTED_WORD_ID', payload: '' });
    handleBack();
    dispatch(goBack());
    Push(0);
  }, [handleBack, dispatch]);

  const tapToTopHeader = React.useCallback(() => {
    Push((v) => v + 1);
  }, []);

  return (
    <>
      <View activePanel={activePanel} history={history} onSwipeBack={swipeBack}>
        <Panel id={MainView.Home}>
          <PanelHeader separator={false} />
          <DictGallery />
          <SearchLayout openCard={() => goForward(MainView.Word)} />
        </Panel>
        <Panel id={MainView.Word} className={css(panelStyle)}>
          <WordPhoto>
            <PanelHeader
              separator={false}
              left={<BtnBack swipeBack={swipeBack} />}
              onClick={tapToTopHeader}
            />
            <WordCard pushed={pushed} />
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
