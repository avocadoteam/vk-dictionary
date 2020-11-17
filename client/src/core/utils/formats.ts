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
