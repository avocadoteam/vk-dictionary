import { IDictionary } from 'src/custom-types/dictionary';

export function buildQueryString(items: IDictionary<string>[]) {
  const joined = items
    .map(it => {
      const key = Object.keys(it)[0];
      return `${key}=${encodeURI(it[key])}`;
    })
    .join('&');
  return joined.length > 0 ? '?' + joined : '';
}
