import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ButtonToggleComponent, ButtonToggleGroupDirective } from './button-toggle';

@NgModule({
  declarations: [
    ButtonToggleComponent,
    ButtonToggleGroupDirective,
  ],
  exports: [
    ButtonToggleComponent,
    ButtonToggleGroupDirective,
  ],
  imports: [
    CommonModule,
  ],
})
export class ButtonToggleModule {
}
