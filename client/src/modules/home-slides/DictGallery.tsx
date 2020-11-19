import { Gallery, Group } from '@vkontakte/vkui';
import { SmallStar } from 'assets/svg/SmallStar';
import { AppDispatchActions, SelectedHomeSlide } from 'core/models';
import { isThemeDrak } from 'core/selectors/common';
import { getSelectedSlide } from 'core/selectors/settings';
import React from 'react';
import { useFela } from 'react-fela';
import { useDispatch, useSelector } from 'react-redux';
import { GallerySlide } from './GallerySlide';

export const DictGallery = React.memo(() => {
  const slide = useSelector(getSelectedSlide);
  const dark = useSelector(isThemeDrak);
  const { css } = useFela();
  const dispatch = useDispatch<AppDispatchActions>();

  const setSlide = (payload: number) => dispatch({ type: 'SET_HOME_SLIDE', payload });

  return (
    <Group className={css({ position: 'relative' })}>
      <Gallery
        slideWidth="100%"
        align="center"
        style={{ height: '30vh' }}
        slideIndex={slide}
        onChange={setSlide}
      >
        <GallerySlide title={'Закладки'} />
        <GallerySlide title={'Большой толковый словарь русского языка'} />
      </Gallery>
      <div
        className={css({
          display: 'flex',
          position: 'absolute',
          bottom: '5px',
          justifyContent: 'center',
          alignItems: 'center',
          width: '100%',
        })}
      >
        <SmallStar
          fill={slide === SelectedHomeSlide.Favourites ? '#CFCFCF' : '#DADADA'}
          className={css({
            opacity: slide === SelectedHomeSlide.Favourites ? undefined : .4,
          })}
        />
        <div
          className={css({
            width: 7,
            height: 7,
            backgroundColor: slide === SelectedHomeSlide.ExpDictionary ? '#CFCFCF' : '#DADADA',
            borderRadius: '50%',
            marginLeft: '11px',
            marginTop: '1px',
            opacity: slide === SelectedHomeSlide.ExpDictionary ? undefined : .4,
          })}
        />
      </div>
    </Group>
  );
});
