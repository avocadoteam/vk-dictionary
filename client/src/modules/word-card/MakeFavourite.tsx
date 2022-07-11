import { Icon20FavoriteOutline, Icon24Favorite } from '@vkontakte/icons';
import { Button } from '@vkontakte/vkui';
import { AppDispatchActions, FetchingStateName, MENU_ICON_SIZE } from 'core/models';
import { isThemeDrak } from 'core/selectors/common';
import {
  canAddMoreFavourites,
  isUserFavouritesUpdating,
  isWordFavourite,
} from 'core/selectors/favourites';
import { hasAtLeastOnePhoto } from 'core/selectors/photos';
import { isPlatformIOS } from 'core/selectors/settings';
import { getSelectedWordId } from 'core/selectors/word';
import { If } from 'modules/atoms';
import React from 'react';
import { useFela } from 'react-fela';
import { useDispatch, useSelector } from 'react-redux';

export const MakeFavourite = React.memo<{}>(({}) => {
  const { css } = useFela();
  const isSelected = useSelector(isWordFavourite);
  const [selected, setSelected] = React.useState(isSelected);
  const dispatch = useDispatch<AppDispatchActions>();
  const dark = useSelector(isThemeDrak);
  const updating = useSelector(isUserFavouritesUpdating);
  const wordId = useSelector(getSelectedWordId);
  const hasPhotos = useSelector(hasAtLeastOnePhoto);
  const canAddMore = useSelector(canAddMoreFavourites);

  React.useEffect(() => {
    if (isSelected && !selected && !updating) {
      setSelected(true);
    } else if (!isSelected && selected && !updating) {
      setSelected(false);
    }
  }, []);

  const handleToggle = () => {
    setSelected(!selected);
    dispatch({
      type: 'SET_UPDATING_DATA',
      payload: FetchingStateName.ToggleFavourite,
      params: wordId,
    });
  };
  const openModal = React.useCallback(() => {
    dispatch({
      type: 'SET_MODAL',
      payload: 'avoplus',
    });
  }, []);

  const color = hasPhotos || dark ? 'rgba(255, 255, 255, 0.85)' : '#717171';

  if (isPlatformIOS() && !canAddMore) return null;

  return (
    <Button
      mode="tertiary"
      className={css({
        padding: 0,
        marginRight: '8px',
        marginLeft: 'auto',
      })}
      onClick={canAddMore ? handleToggle : openModal}
    >
      <If
        is={selected}
        else={<Icon20FavoriteOutline fill={color} width={MENU_ICON_SIZE} height={MENU_ICON_SIZE} />}
      >
        <Icon24Favorite fill={color} width={MENU_ICON_SIZE} height={MENU_ICON_SIZE} />
      </If>
    </Button>
  );
});
