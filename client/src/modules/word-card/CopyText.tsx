import { Icon24Copy } from '@vkontakte/icons';
import { Button } from '@vkontakte/vkui';
import { AppDispatchActions, MENU_ICON_SIZE, SnackType } from 'core/models';
import { isThemeDrak } from 'core/selectors/common';
import { hasAtLeastOnePhoto } from 'core/selectors/photos';
import { isPlatformIOS } from 'core/selectors/settings';
import { getSelectedCardData } from 'core/selectors/word';
import { vkBridge } from 'core/vk-bridge/instance';
import { tapticSelected } from 'core/vk-bridge/taptic';
import React from 'react';
import { useFela } from 'react-fela';
import { useDispatch, useSelector } from 'react-redux';

export const CopyText = React.memo(() => {
  const { css } = useFela();
  const dark = useSelector(isThemeDrak);
  const hasPhotos = useSelector(hasAtLeastOnePhoto);
  const dispatch = useDispatch<AppDispatchActions>();
  const data = useSelector(getSelectedCardData);

  const color = hasPhotos || dark ? 'rgba(255, 255, 255, 0.85)' : '#717171';

  const copyText = React.useCallback(() => {
    if (isPlatformIOS()) {
      tapticSelected();
    }
    vkBridge
      .send('VKWebAppCopyText', { text: data.plainDefinition })
      .then(() => {
        if (isPlatformIOS()) {
          tapticSelected();
        }
        dispatch({
          type: 'ENQUEUE_SNACK',
          payload: { type: SnackType.Success, message: 'Текст скопирован' },
        });
      })
      .catch(() =>
        dispatch({
          type: 'ENQUEUE_SNACK',
          payload: { type: SnackType.Error, message: 'Не удалось скопировать текст' },
        })
      );
  }, [data.plainDefinition]);

  return (
    <Button
      mode="tertiary"
      className={css({
        padding: 0,
        marginRight: '8px',
      })}
      onClick={copyText}
    >
      <Icon24Copy fill={color} width={MENU_ICON_SIZE} height={MENU_ICON_SIZE} />
    </Button>
  );
});
