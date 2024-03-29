import {
  Icon24MoreHorizontal,
  Icon24ShareOutline,
  Icon28ChevronDownOutline,
} from '@vkontakte/icons';
import { Button, Spinner, Text } from '@vkontakte/vkui';
import { appId, MENU_ICON_SIZE } from 'core/models';
import { isThemeDrak } from 'core/selectors/common';
import { getFirstPhoto, hasAtLeastOnePhoto, isPhotosUpdating } from 'core/selectors/photos';
import { getSelectedWordId } from 'core/selectors/word';
import { isDifferentLayout } from 'core/utils';
import { hexToRgba } from 'core/utils/formats';
import { vkBridge } from 'core/vk-bridge/instance';
import { If } from 'modules/atoms';
import React from 'react';
import { useFela } from 'react-fela';
import { useSelector } from 'react-redux';
import { animated, useSpring } from 'react-spring';
import { CopyText } from './CopyText';
import { MakeFavourite } from './MakeFavourite';

export const WordMenu = React.memo<{}>(({}) => {
  const [show, setShow] = React.useState(false);
  const photo = useSelector(getFirstPhoto);
  const hasPhotos = useSelector(hasAtLeastOnePhoto);
  const updating = useSelector(isPhotosUpdating);
  const { css } = useFela();

  const toggleMenu = React.useCallback(() => {
    setShow((v) => !v);
  }, []);

  const [{ height, padding, opacity }] = useSpring(
    () => ({
      height: show ? 75 : 0,
      padding: show ? '8px 21px' : 0,
      opacity: show ? 1 : 0,
    }),
    [show]
  );

  return (
    <>
      <div
        className={css({
          margin: `auto 1.5rem ${isDifferentLayout() && !show ? '2rem' : 0} auto`,
        })}
      >
        <If is={!updating} else={<Spinner />}>
          <If is={hasPhotos} else={<MenuActions />}>
            <Button
              mode="tertiary"
              className={css({
                padding: 0,
              })}
              onClick={toggleMenu}
            >
              <If
                is={!show}
                else={
                  <Icon28ChevronDownOutline
                    fill={'rgba(255, 255, 255, 0.9)'}
                    width={30}
                    height={30}
                  />
                }
              >
                <Icon24MoreHorizontal fill={'rgba(255, 255, 255, 0.9)'} width={30} height={30} />
              </If>
            </Button>
          </If>
        </If>
      </div>
      <animated.div
        style={{ padding, height, opacity, maxHeight: 60 } as any}
        className={css({
          background: `linear-gradient(180deg, rgba(0, 0, 0, 0.1) 0%, rgba(0, 0, 0, 0) 100%), ${hexToRgba(
            photo.color ?? '',
            0.5
          )}`,
          borderRadius: '0px 0px 15px 15px',
          justifyContent: 'space-between',
          alignItems: 'center',
          display: 'flex',
          willChange: 'padding, height, opacity',
        })}
      >
        <If is={show}>
          <Text
            weight="medium"
            className={css({
              whiteSpace: 'nowrap',
              textOverflow: 'ellipsis',
              overflow: 'hidden',
              color: 'rgba(255, 255, 255, 0.9)',
              fontWeight: 500,
              fontSize: '13px',
              lineHeight: '16px',
            })}
          >
            Фото:{' '}
            <a
              href={`${photo.userLink}?utm_source=ExplanatoryDictionary&utm_medium=referral`}
              target="_blank"
              rel="noopener noreferrer"
              className={css({
                color: 'rgba(255, 255, 255, 0.9)',
                fontWeight: 500,
                fontSize: '13px',
                lineHeight: '16px',
              })}
            >
              {photo.userName}
            </a>{' '}
            на Unsplash
          </Text>
          <span className={css({ display: 'flex' })}>
            <MenuActions />
          </span>
        </If>
      </animated.div>
    </>
  );
});

const MenuActions = React.memo<{}>(({}) => {
  const dark = useSelector(isThemeDrak);
  const hasPhotos = useSelector(hasAtLeastOnePhoto);
  const { css } = useFela();
  const id = useSelector(getSelectedWordId);

  const shareWord = React.useCallback(() => {
    vkBridge.send('VKWebAppShare', { link: `https://vk.com/app${appId}#${id}` });
  }, [id]);

  return (
    <>
      <MakeFavourite />
      <CopyText />
      <Button
        mode="tertiary"
        className={css({
          padding: 0,
        })}
        onClick={shareWord}
      >
        <Icon24ShareOutline
          fill={hasPhotos || dark ? 'rgba(255, 255, 255, 0.85)' : '#717171'}
          width={MENU_ICON_SIZE}
          height={MENU_ICON_SIZE}
        />
      </Button>
    </>
  );
});
