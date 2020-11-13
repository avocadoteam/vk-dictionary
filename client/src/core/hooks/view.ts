import { useState, useMemo } from 'react';
import { vkBridge } from 'core/vk-bridge/instance';

export const useViewChange = <T = {}>(viewEnum: T, defaultKeyView: keyof T, withSwipe = false) => {
  const defaultView = useMemo(() => viewEnum[defaultKeyView], [viewEnum, defaultKeyView]);

  const [viewState, setView] = useState({
    activePanel: defaultView,
    h: [defaultView],
  });

  const goBack = () => {
    if (viewState.h.length === 1) {
      return;
    }
    const localH = [...viewState.h];
    localH.pop();

    const activePanel = localH[localH.length - 1];
    if (activePanel === defaultView && withSwipe) {
      vkBridge.send('VKWebAppDisableSwipeBack');
    }
    setView({ h: localH, activePanel });
  };

  const goForward = (activePanel: T[keyof T]) => {
    const localH = [...viewState.h];
    localH.push(activePanel);

    if (viewState.activePanel === defaultView && withSwipe) {
      vkBridge.send('VKWebAppEnableSwipeBack');
    }
    setView({ h: localH, activePanel });
  };

  return {
    goBack,
    goForward,
    activeView: viewState.activePanel,
    history: viewState.h,
  };
};
