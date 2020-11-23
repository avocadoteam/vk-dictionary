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

export const hexToRgba = (hex: string, o = 1) => {
  const bigint = parseInt(hex.replace(/[^0-9A-F]/gi, ''), 16);
  const r = (bigint >> 16) & 255;
  const g = (bigint >> 8) & 255;
  const b = bigint & 255;

  return `rgba(${r},${g},${b},${o})`;
};
