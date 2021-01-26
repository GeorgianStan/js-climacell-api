/**
 * * Types
 */
import { QueryBuilderOptions } from './@types';

class Class {
  /**
   * * Public fields
   */

  /**
   * * queryBuilder()
   * ? compute a url with query parameters
   * @param url  - url of the request
   * @param options - key-value pair to add as url parameters
   */
  queryBuilder(url: string, options: QueryBuilderOptions) {
    url.includes('?') ? null : (url += '?');

    Object.keys(options).forEach((key) => {
      if (
        typeof options[key] === 'number' ||
        typeof options[key] === 'string'
      ) {
        if (url.slice(-1) !== '?' && url.slice(-1) !== '&') {
          url += '&';
        }
        url += `${key}=${options[key]}`;
      } else if (Array.isArray(options[key])) {
        const arr: string[] | number[] = options[key] as any[];

        arr.forEach((e: string | number) => {
          if (typeof e === 'number' || typeof e === 'string') {
            if (url[url.length - 1] !== '?') {
              url += '&';
            }
            url += `${key}=${e}`;
          }
        });
      }
    });
    return url;
  }
}

const UtilService = new Class();

Object.freeze(UtilService);

export { UtilService };
