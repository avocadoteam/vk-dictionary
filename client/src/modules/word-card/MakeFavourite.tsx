import { Icon20FavoriteOutline, Icon24Favorite } from '@vkontakte/icons';
import { Button } from '@vkontakte/vkui';
import { AppDispatchActions, FetchingStateName } from 'core/models';
import { isThemeDrak } from 'core/selectors/common';
import { isUserFavouritesUpdating, isWordFavourite } from 'core/selectors/favourites';
import { getWordPhotos } from 'core/selectors/photos';
import { getSelectedWordId } from 'core/selectors/word';
import { If } from 'modules/atoms';
import React from 'react';
import { useFela } from 'react-fela';
import { useDispatch, useSelector } from 'react-redux';

export const MakeFavourite = React.memo(() => {
  const { css } = useFela();
  const dispatch = useDispatch<AppDispatchActions>();
  const dark = useSelector(isThemeDrak);
  const isSelected = useSelector(isWordFavourite);
  const updating = useSelector(isUserFavouritesUpdating);
  const wordId = useSelector(getSelectedWordId);
  const photos = useSelector(getWordPhotos);
  const hasPhotos = !!photos?.length;

  const handleToggle = () => {
    dispatch({
      type: 'SET_UPDATING_DATA',
      payload: FetchingStateName.ToggleFavourite,
      params: wordId,
    });
  };

  const color = hasPhotos || dark ? 'rgba(255, 255, 255, 0.85)' : '#717171';

  return (
    <Button
      mode="tertiary"
      className={css({
        padding: 0,
        marginRight: '12px',
      })}
      onClick={handleToggle}
      disabled={updating}
    >
      <If is={isSelected} fallback={<Icon20FavoriteOutline fill={color} width={30} height={30} />}>
        <Icon24Favorite fill={color} width={30} height={30} />
      </If>
    </Button>
  );
});
