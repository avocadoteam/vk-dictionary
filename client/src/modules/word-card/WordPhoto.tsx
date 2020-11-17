import { AppDispatchActions, FetchingStateName } from 'core/models';
import { getWordPhotos } from 'core/selectors/photos';
import { getSelectedCardData } from 'core/selectors/word';
import { If } from 'modules/atoms';
import React from 'react';
import { useFela } from 'react-fela';
import { useDispatch, useSelector } from 'react-redux';

export const WordPhoto = React.memo(({ children }) => {
  const data = useSelector(getSelectedCardData);
  const photos = useSelector(getWordPhotos);
  const hasPhotos = !!photos?.length;
  const { css } = useFela();
  const dispatch = useDispatch<AppDispatchActions>();
  React.useEffect(() => {
    if (!data.definition) {
      dispatch({ type: 'SET_UPDATING_DATA', payload: FetchingStateName.WordInfo });
    }
  }, []);

  return (
    <>
      {children}
      <If is={hasPhotos}>
        <img
          src={photos[0]?.url}
          className={css({
            touchAction: 'none',
            objectFit: 'cover',
            width: '100%',
            height: '100vh',
            position: 'absolute',
            top: 0,
          })}
        />
      </If>
    </>
  );
});
