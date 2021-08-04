import { isDev } from 'core/models';
import { fromFetch } from 'rxjs/fetch';

const mainUrl = isDev ? '' : 'https://dict.app-dich.com';

export const request = <T = {}>(url: string, method: Method, data?: T) =>
  fromFetch(`${mainUrl}/api${url}`, {
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
