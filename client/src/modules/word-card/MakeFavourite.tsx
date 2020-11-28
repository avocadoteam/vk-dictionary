import { Icon20FavoriteOutline, Icon24Favorite } from '@vkontakte/icons';
import { Button } from '@vkontakte/vkui';
import { AppDispatchActions, FetchingStateName } from 'core/models';
import { isThemeDrak } from 'core/selectors/common';
import { isUserFavouritesUpdating, isWordFavourite } from 'core/selectors/favourites';
import { hasAtLeastOnePhoto } from 'core/selectors/photos';
import { getSelectedWordId } from 'core/selectors/word';
import { If } from 'modules/atoms';
import React from 'react';
import { useFela } from 'react-fela';
import { useDispatch, useSelector } from 'react-redux';

export const MakeFavourite = React.memo(() => {
  const { css } = useFela();
  const isSelected = useSelector(isWordFavourite);
  const [selected, setSelected] = React.useState(isSelected);
  const dispatch = useDispatch<AppDispatchActions>();
  const dark = useSelector(isThemeDrak);
  const updating = useSelector(isUserFavouritesUpdating);
  const wordId = useSelector(getSelectedWordId);
  const hasPhotos = useSelector(hasAtLeastOnePhoto);

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

  const color = hasPhotos || dark ? 'rgba(255, 255, 255, 0.85)' : '#717171';

  return (
    <Button
      mode="tertiary"
      className={css({
        padding: 0,
        marginRight: '8px',
        marginLeft: 'auto',
      })}
      onClick={handleToggle}
    >
      <If is={selected} else={<Icon20FavoriteOutline fill={color} width={24} height={24} />}>
        <Icon24Favorite fill={color} width={24} height={24} />
      </If>
    </Button>
  );
});
