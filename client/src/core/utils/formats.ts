export const safeTrim = (value: string) => {
  if (!!value) {
    return value.trim();
  }
  return value;
};

export const normalizeText = (text: string) =>
  text
    .replaceAll('<br>', '<div style="margin: 1rem;"></div>')
    .replaceAll('◊', '')
    .replaceAll('&nbsp;', '');

export const normalizeTextPreview = (text: string) => {
  if (text.startsWith('<i>') && text.endsWith('</i>')) {
    text = text.slice(3);
    text = text.slice(0, -4);
  }

  return text.replaceAll('<br>', '').replaceAll('◊', '').replaceAll('&nbsp;', '');
};

export const hexToRgba = (hex: string, o = 1) => {
  const bigint = parseInt(hex.replace(/[^0-9A-F]/gi, ''), 16);
  const r = (bigint >> 16) & 255;
  const g = (bigint >> 8) & 255;
  const b = bigint & 255;

  return `rgba(${r},${g},${b},${o})`;
};

const onlyRuLetters = /[^(а-яА-я|ёЁ|\-) ]/g;
export const shapeTextSearch = (v: string) => {
  v = v.replace(onlyRuLetters, '');
  if (v.length > 35) {
    return v.slice(0, 34);
  }
  return v;
};
export const shapeToPLainDefenition = (v: string) =>
  v
    ?.replaceAll('◊', ' ')
    .replaceAll('&nbsp;', ' ')
    .replace(/<[^>]*>?/gm, '') ?? '';

export const cleanFromNumbers = (v: string) => v.replace(/[0-9]/g, '');
