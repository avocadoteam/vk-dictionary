import { pick } from 'ramda';

export const arrayOfObjectsToDictionary = <
  T extends { [key in string | number | symbol]: T[keyof T] }
>(
  arrayToMap: T[],
  keys: Partial<keyof T>[],
  keyToMap: keyof T,
) =>
  arrayToMap.reduce((hash, obj) => {
    const objectKey = obj[keyToMap];
    if (
      typeof objectKey === 'string' ||
      typeof objectKey === 'number' ||
      typeof objectKey === 'symbol'
    ) {
      hash[objectKey] = (pick(keys, obj) as unknown) as Pick<T, keyof T>;
      return hash;
    } else {
      throw new Error(
        `Can only index over string or number or symbol values. You tried to index over a value of type ${typeof objectKey}`,
      );
    }
  }, {} as { [key in keyof T]?: Pick<T, keyof T> });
