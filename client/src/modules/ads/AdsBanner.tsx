import { Card, CardGrid, PromoBanner } from '@vkontakte/vkui';
import { AppDispatchActions } from 'core/models';
import { getAdsData, isAdsVisible } from 'core/selectors/ads';
import React from 'react';
import { useFela } from 'react-fela';
import { useDispatch, useSelector } from 'react-redux';

export const AdsBanner = React.memo(() => {
  const { css } = useFela();
  const adsData = useSelector(getAdsData);
  const adsBanner = useSelector(isAdsVisible);
  const dispatch = useDispatch<AppDispatchActions>();

  const hideAds = React.useCallback(() => {
    dispatch({ type: 'SET_ADS', payload: false });
  }, [dispatch]);

  if (!adsData || !adsBanner) {
    return null;
  }

  return (
    <CardGrid
      className={css({
        margin: '0 15px 10px',
        width: 'calc(100% - 30px)',
        padding: 0,
      })}
    >
      <Card
        size="l"
        className={css({
          borderRadius: '17px !important',
          padding: '0',
          overflow: 'hidden',
        })}
      >
        <div style={{ minHeight: 28 }}>
          <PromoBanner
            className={css({ outline: 'none !important', border: 'none !important' })}
            onClose={hideAds}
            bannerData={adsData}
          />
        </div>
      </Card>
    </CardGrid>
  );
});
