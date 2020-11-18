import { AppDispatchActions, FetchingStateName } from 'core/models';
import { getWordPhotos } from 'core/selectors/photos';
import { If } from 'modules/atoms';
import React from 'react';
import { useFela } from 'react-fela';
import { useDispatch, useSelector } from 'react-redux';

export const WordPhoto = React.memo(({ children }) => {
  const photos = useSelector(getWordPhotos);
  const hasPhotos = !!photos?.length;
  const { css } = useFela();
  const dispatch = useDispatch<AppDispatchActions>();
  React.useEffect(() => {
    dispatch({ type: 'SET_UPDATING_DATA', payload: FetchingStateName.WordPhotos });

    return () => {
      dispatch({
        type: 'SET_READY_DATA',
        payload: { data: [], name: FetchingStateName.WordPhotos },
      });
    };
  }, []);

  return (
    <>
      {children}
      <If is={hasPhotos}>
        <div
          className={css({
            touchAction: 'none',
            objectFit: 'cover',
            width: '100%',
            height: '100vh',
            position: 'absolute',
            top: 0,
            borderRadius: '15px',
            backgroundSize: 'cover',
            backgroundRepeat: 'no-repeat',
            backgroundPosition: 'center center',
            backgroundImage: `
              linear-gradient(180deg, rgba(0, 0, 0, 0.65) 36.46%, rgba(0, 0, 0, 0) 57.29%, rgba(0, 0, 0, 0) 90.62%, rgba(0, 0, 0, 0.5) 100%), url(${photos[0]?.url})
            `,
          })}
        />
      </If>
    </>
  );
});
