import { Directive, forwardRef, OnDestroy, OnInit } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';
import { CdkDropList } from '@angular/cdk/drag-drop';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

@Directive({
  selector: '[cdkDropList][cdkDropListData][appDropListControlValueAccessor]',
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => DropListControlValueAccessorDirective),
      multi: true,
    },
  ],
})
export class DropListControlValueAccessorDirective<T = { id: any }>
  implements ControlValueAccessor, OnInit, OnDestroy {
  private readonly destroy$ = new Subject();

  constructor(private cdkDropList: CdkDropList) {}

  ngOnInit(): void {
    this.cdkDropList.dropped
      .pipe(takeUntil(this.destroy$))
      .subscribe(() => this.onChange(this.cdkDropList.data.map((item: any) => item.id)));
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

  writeValue(value: T[]): void {
    this.sortList(value);
  }

  registerOnChange(fn: (value: T[]) => void): void {
    this.onChange = fn;
  }

  registerOnTouched(fn: () => void): void {
    this.onTouched = fn;
  }

  private onChange = (value: T[]) => {};

  private onTouched = () => {};

  private sortList(value: T[]): void {
    if (!(this.cdkDropList && this.cdkDropList.data && value)) {
      return;
    }

    this.cdkDropList.data.sort((a: any, b: any) => value.indexOf(a.id) - value.indexOf(b.id));
  }
}
