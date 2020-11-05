import { ChangeDetectorRef, OnDestroy, Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'isNumeric',
  pure: false,
})
export class IsNumericPipe implements PipeTransform {
  transform(value: any): boolean {
    return /^\d+$/.test(value);
  }
}
