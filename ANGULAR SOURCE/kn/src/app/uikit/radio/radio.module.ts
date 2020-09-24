import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RadioButtonComponent, RadioGroupDirective } from './radio';

@NgModule({
  declarations: [
    RadioGroupDirective,
    RadioButtonComponent,
  ],
  exports: [
    RadioGroupDirective,
    RadioButtonComponent,
  ],
  imports: [
    CommonModule,
  ],
})
export class RadioModule {
}
