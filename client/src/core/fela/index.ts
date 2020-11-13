import webPreset from 'fela-preset-web';
import embedded from 'fela-plugin-embedded';
import { createRenderer } from 'fela';

export const configureFela = () => {
  const renderer = createRenderer({
    selectorPrefix: 'f_',
    plugins: [...webPreset, embedded()]
  });

  return renderer;
};
