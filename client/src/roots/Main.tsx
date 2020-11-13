import React from 'react';
import { View, Panel, Div } from '@vkontakte/vkui';
import { Offline } from './Offline';
import { SnakbarsErr } from 'modules/snaks';

export const Main = React.memo(() => {
  return (
    <>
      <View activePanel={'kek'}>
        <Panel id={'kek'}>
          <Div>kek</Div>
        </Panel>
        <Panel id={'offline'}>
          <Offline />
        </Panel>
      </View>
      <SnakbarsErr />
    </>
  );
});
