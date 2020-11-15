import { Method, request } from './common';

export const searchInExpDict = (q: string, v: string) =>
  request(`/exp-dictionary${q}&query=${v}`, Method.Get);

export const mostExpDictWords = (q: string) =>
  request(`/exp-dictionary/freq-words${q}`, Method.Get);
