import { Method, request } from './common';

export const getUserFavourites = (q: string) => request(`/user-favourite${q}`, Method.Get);
export const setUserFavourite = (q: string, wordId: string) =>
  request(`/user-favourite${q}`, Method.Put, { wordId });
