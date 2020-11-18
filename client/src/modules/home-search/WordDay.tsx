import { Icon24ChevronRight } from '@vkontakte/icons';
import { AppDispatchActions } from 'core/models';
import { isThemeDrak } from 'core/selectors/common';
import { getWordOfTheDay } from 'core/selectors/photos';
import React from 'react';
import { useFela } from 'react-fela';
import { useDispatch, useSelector } from 'react-redux';

export const WordDay = React.memo(() => {
  const data = useSelector(getWordOfTheDay);
  const dark = useSelector(isThemeDrak);
  const { css } = useFela();
  const dispatch = useDispatch<AppDispatchActions>();

  const goToWord = React.useCallback(() => {
    dispatch({
      type: 'SET_SELECTED_WORD_ID',
      payload: data.wordId,
    });
  }, [data.wordId]);

  if (!data.wordId) {
    return null;
  }

  return (
    <div
      onClick={goToWord}
      className={css({
        display: 'flex',
        margin: '20px 15px 10px',
        height: '70px',
        width: 'calc(100% - 30px)',
        borderRadius: '18px',
        justifyContent: 'space-between',
        alignItems: 'center',
        background: dark
          ? `linear-gradient(0deg, rgba(0, 0, 0, 0.75), rgba(0, 0, 0, 0.75)), url(${data.photo.url});`
          : `linear-gradient(0deg, rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.5)), url(${data.photo.url});`,
      })}
    >
      <div className={css({ marginLeft: '1rem' })}>
        <div
          className={css({
            marginBottom: '5px',
            color: '#FFFFFF',
            fontSize: '15px',
            lineHeight: '18px',
          })}
        >
          {data.name}
        </div>
        <div
          className={css({
            color: 'rgba(255, 255, 255, 0.75)',
            fontSize: '13px',
            lineHeight: '16px',
          })}
        >
          Слово дня
        </div>
      </div>
      <div>
        <Icon24ChevronRight
          width={18}
          height={18}
          className={css({ marginRight: '1rem', color: '#FFFFFF' })}
        />
      </div>
    </div>
  );
});
