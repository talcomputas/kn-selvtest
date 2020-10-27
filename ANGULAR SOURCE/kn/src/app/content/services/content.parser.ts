import { Injectable } from '@angular/core';
import { isDefined } from '../utils/utils';

@Injectable()
export class ContentParser {
  public getValue(target: object, key: string): any {
    const keys = key.split('.');
    key = '';
    do {
      key += keys.shift();
      if (
        isDefined(target) &&
        isDefined(target[key]) &&
        (typeof target[key] === 'object' || !keys.length)
      ) {
        target = target[key];
        key = '';
      } else if (!keys.length) {
        target = undefined;
      } else {
        key += '.';
      }
    } while (keys.length);

    return target;
  }
}
