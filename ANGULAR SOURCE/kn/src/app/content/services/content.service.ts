import { Injectable } from '@angular/core';
import { ContentParser } from './content.parser';
import { isDefined, mergeDeep } from '../utils/utils';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable()
export class ContentService {
  private readonly changes$ = new BehaviorSubject<boolean>(false);
  private readonly contentMap = new Map<string, object>();
  private ctx: string; // nn or nb

  constructor(private parser: ContentParser) {}

  get changes(): Observable<boolean> {
    return this.changes$.asObservable();
  }

  set(ctx: string, data: object): void {
    let content = this.contentMap.get(ctx);
    content = content ? mergeDeep(content, data) : data;
    // @ts-ignore
    this.contentMap.set(ctx, content);
    this.changes$.next(true);
  }

  get(key: string): any {
    if (!isDefined(key) || !key.length) {
      throw new Error(`Parameter "key" required`);
    }
    // @ts-ignore
    return this.getParsedResult(this.contentMap.get(this.ctx), key);
  }

  setCtx(ctx: string) {
    this.ctx = ctx;
    this.changes$.next(true);
  }

  getCtx(): string {
    return this.ctx;
  }

  unset(key: string): void {
    this.contentMap.delete(key);
  }

  getCtxList(): string[] {
    return Array.from(this.contentMap.keys());
  }

  private getParsedResult(content: object, key: string): any {
    if (!content) {
      return key || null;
    }

    const res: any = this.parser.getValue(content, key);

    return typeof res !== 'undefined' ? res : key;
  }
}
