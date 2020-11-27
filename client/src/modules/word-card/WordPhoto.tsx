import { AppDispatchActions, FetchingStateName } from 'core/models';
import { getFirstPhoto, hasAtLeastOnePhoto } from 'core/selectors/photos';
import { If } from 'modules/atoms';
import React from 'react';
import { useFela } from 'react-fela';
import { useDispatch, useSelector } from 'react-redux';
import { animated, useSpring } from 'react-spring';

export const WordPhoto = React.memo(({ children }) => {
  const photo = useSelector(getFirstPhoto);
  const hasPhotos = useSelector(hasAtLeastOnePhoto);
  const [url, setUrl] = React.useState<string | undefined>(undefined);
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

  React.useEffect(() => {
    if (hasPhotos) {
      setUrl(photo.url);
    }

    return () => {
      setUrl(undefined);
    };
  }, [hasPhotos, photo.url]);

  const [{ backgroundImage, opacity }] = useSpring(
    () => ({
      backgroundImage: url
        ? `linear-gradient(0deg, rgba(0, 0, 0, 0.65), rgba(0, 0, 0, 0.65)), url(${url})`
        : undefined,
      opacity: url ? 1 : 0,
    }),
    [url]
  );

  return (
    <>
      {children}
      <If is={hasPhotos}>
        <animated.div
          style={{ backgroundImage, opacity } as any}
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
            transition: 'opacity .2s ease',
            willChange: 'backgroundImage, opacity',
          })}
        />
      </If>
    </>
  );
});
