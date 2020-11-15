import { Method, request } from './common';

export const searchInExpDict = (q: string, v: string) =>
  request(`/exp-dictionary?${q}&query=${v}`, Method.Get);
