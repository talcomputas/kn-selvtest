import { ChangeDetectorRef, OnDestroy, Pipe, PipeTransform } from '@angular/core';
import { Subscription } from 'rxjs';
import { filter } from 'rxjs/operators';
import { equals } from '../utils/utils';
import { ContentService } from '../services/content.service';

@Pipe({
  name: 'content',
  pure: false,
})
export class ContentPipe implements PipeTransform, OnDestroy {
  private value = '';
  private lastKey: string;
  private lastArgs: any[];
  private ctxSubscription: Subscription;

  constructor(private contentService: ContentService,
              private cdRef: ChangeDetectorRef) {
  }

  transform(key: string, ...args: any[]): any {
    if (!key || key.length === 0) {
      return key;
    }

    // if we ask another time for the same key, return the last value
    if (equals(key, this.lastKey) && equals(args, this.lastArgs)) {
      return this.value;
    }

    // store the key and args, in case it changes
    this.lastKey = key;
    this.lastArgs = args;

    // set the value
    this.updateValue(key);

    // if there is a subscription to ctx, clean it
    this.dispose();

    // subscribe to changes event, in case the ctx changes
    if (!this.ctxSubscription) {
      this.ctxSubscription = this.contentService.changes.pipe(filter(() => !!this.lastKey)).subscribe(() => {
        this.lastKey = null; // to make sure it doesn't return the same value until it's been updated
        this.updateValue(key);
        this.lastKey = key;
      });
    }

    return this.value;
  }

  ngOnDestroy(): void {
    this.dispose();
  }

  private updateValue(key: string): void {
    const value = this.contentService.get(key);
    this.value = value !== undefined ? value : key;
    this.cdRef.markForCheck();
  }

  private dispose(): void {
    if (this.ctxSubscription) {
      this.ctxSubscription.unsubscribe();
      this.ctxSubscription = null;
    }
  }

}
