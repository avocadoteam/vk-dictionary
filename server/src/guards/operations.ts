import * as qs from 'querystring';
import * as crypto from 'crypto';

type ParsedQsValue = string | string[];

interface ParsedQs {
  [key: string]: ParsedQsValue;
}

export const isSignValid = (query: ParsedQs, vkSecretKey: string) => {
  const ordered: { [key: string]: ParsedQsValue } = {};
  Object.keys(query)
    .sort()
    .forEach((key) => {
      if (key.slice(0, 3) === 'vk_') {
        ordered[key] = query[key];
      }
    });

  const stringParams = qs.stringify(ordered);
  const paramsHash = crypto
    .createHmac('sha256', vkSecretKey)
    .update(stringParams)
    .digest()
    .toString('base64')
    .replace(/\+/g, '-')
    .replace(/\//g, '_')
    .replace(/=$/, '');

  return paramsHash === query.sign;
};
