import { Injectable } from '@angular/core';
import { throwError } from 'rxjs';
import { isDefined } from '../utils/utils';

@Injectable()
export class ContentParser {
  public getValue(target: { [key: string]: any }, key: string): any {
    const originalKey = key;
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
        throw new Error('ContentParser: Could not find content with key: ' + originalKey);
      } else {
        key += '.';
      }
    } while (keys.length);

    return target;
  }
}
