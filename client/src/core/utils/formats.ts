export const safeTrim = (value: string) => {
  if (!!value) {
    return value.trim();
  }
  return value;
};