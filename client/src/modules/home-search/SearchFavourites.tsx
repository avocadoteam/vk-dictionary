import { Icon20FavoriteOutline, Icon20Stars } from '@vkontakte/icons';
import { Cell, Placeholder, Search, Text } from '@vkontakte/vkui';
import { AppDispatchActions } from 'core/models';
import { isThemeDrak } from 'core/selectors/common';
import { getFavQ, getUserFavouritesList } from 'core/selectors/favourites';
import { getSearchHeight } from 'core/selectors/search';
import { isPlatformIOS } from 'core/selectors/settings';
import { isUserPremium } from 'core/selectors/user';
import { stopEvents } from 'core/utils';
import { normalizeTextPreview, shapeTextSearch } from 'core/utils/formats';
import { If } from 'modules/atoms';
import React from 'react';
import { useFela } from 'react-fela';
import { useDispatch, useSelector } from 'react-redux';
import { animated, useChain, useTransition } from 'react-spring';
import { textPreview } from './style';

export const SearchFavourites = React.memo<{ openCard: () => void }>(({ openCard: goForward }) => {
  const dark = useSelector(isThemeDrak);
  const searchRef = React.useRef<HTMLInputElement | null>(null);
  const { css } = useFela({ dark });
  const query = useSelector(getFavQ);
  const values = useSelector(getUserFavouritesList);
  const parentHeight = useSelector(getSearchHeight);
  const dispatch = useDispatch<AppDispatchActions>();
  const isPremium = useSelector(isUserPremium);

  const openCard = React.useCallback(
    (payload: string) => {
      goForward();
      dispatch({
        type: 'SET_SELECTED_WORD_ID',
        payload,
      });
    },
    [goForward]
  );
  const openModal = React.useCallback(() => {
    dispatch({
      type: 'SET_MODAL',
      payload: 'avoplus',
    });
  }, []);

  const handleSearch = React.useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    dispatch({
      type: 'SET_FAVOURITES_Q',
      payload: shapeTextSearch(e.target.value ?? ''),
    });
  }, []);

  const sumbitSearch = React.useCallback(
    (e: React.FormEvent<HTMLFormElement>) => {
      e.preventDefault();
      dispatch({
        type: 'SET_FAVOURITES_Q',
        payload: query,
      });
      searchRef.current?.blur();
    },
    [query]
  );

  const transRef = React.useRef<any>();
  const transition = useTransition(values, {
    from: {
      transform: 'scale(0)',
    },
    enter: {
      transform: 'scale(1)',
    },
    ref: transRef,
    unique: true,
    trail: 200 / values.length,
    key: (v) => v.id,
  });

  useChain([transRef], [0, 0.6]);
  const resultsRender = transition((style, v) => {
    return (
      <animated.div
        style={style}
        className={css({ paddingTop: '20px' })}
        onClick={() => openCard(v.id)}
      >
        <div
          className={css(textPreview)}
          dangerouslySetInnerHTML={{ __html: normalizeTextPreview(v.definition ?? '') }}
        />
      </animated.div>
    );
  });

  return (
    <>
      <form onSubmit={sumbitSearch}>
        <Search
          after={null}
          className={css({
            backgroundColor: 'transparent',
            padding: '0 15px 1px',
            borderRadius: '18px',
          })}
          onChange={handleSearch}
          placeholder={'Поиск'}
          value={query}
          maxLength={35}
          getRef={searchRef}
        />
      </form>
      <If is={!!values?.length}>
        <div
          className={css({
            paddingBottom: '4px',
            height: `calc(${parentHeight} - 90px)`,
            overflowY: 'scroll',
            maskImage: 'linear-gradient(to bottom, black 97%, transparent 100%)',
            '-webkit-mask-image': 'linear-gradient(to bottom, black 97%, transparent 100%)',
            '-webkit-overflow-scrolling': 'touch',
          } as any)}
          onPointerDown={stopEvents}
        >
          {!isPremium && !isPlatformIOS() ? (
            <Cell
              className={css({ marginTop: '.5rem' })}
              onClick={openModal}
              before={<Icon20Stars />}
              multiline
            >
              Еще больше закладок с подпиской avocado+
            </Cell>
          ) : null}

          {resultsRender}
        </div>
      </If>
      <If is={!values?.length}>
        <Placeholder
          icon={
            <Icon20FavoriteOutline
              fill={dark ? '#FFFFFF' : 'rgba(0, 0, 0, 0.75)'}
              width={26}
              height={26}
            />
          }
          header={
            <Text
              weight="medium"
              className={`${css({
                color: dark ? '#FFFFFF' : 'rgba(0, 0, 0, 0.75)',
                fontSize: '19px',
                lineHeight: '24px',
                letterSpacing: '0.38px',
              })} usePRO`}
            >
              Закладок нет
            </Text>
          }
        >
          <Text
            weight="medium"
            className={`${css({
              color: dark ? '#FFFFFF' : '#818C99',
              fontSize: '16px',
              lineHeight: '20px',
              letterSpacing: '-0.32px',
              fontStyle: 'normal',
              fontWeight: 'normal',
            })} usePRO`}
          >
            Добавьте любое слово в закладки, чтобы оно появилось тут.
          </Text>
        </Placeholder>
      </If>
    </>
  );
});
