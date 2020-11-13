import { fromFetch } from 'rxjs/fetch';

export const request = <T = {}>(url: string, method: Method, data?: T) =>
  fromFetch(`/api${url}`, {
    headers: {
      'Content-Type': 'application/json; charset=UTF-8',
    },
    method: method,
    body: data ? JSON.stringify(data) : undefined,
  });

export enum Method {
  Get = 'get',
  Post = 'post',
  Put = 'put',
  Delete = 'delete',
}
