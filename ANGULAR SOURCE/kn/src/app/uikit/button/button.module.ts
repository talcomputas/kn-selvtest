import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AnchorComponent, ButtonComponent, IconButtonDirective, RaisedButtonDirective, StrokedButtonDirective } from './button';

@NgModule({
  declarations: [
    StrokedButtonDirective,
    RaisedButtonDirective,
    IconButtonDirective,
    ButtonComponent,
    AnchorComponent,
  ],
  exports: [
    StrokedButtonDirective,
    RaisedButtonDirective,
    IconButtonDirective,
    ButtonComponent,
    AnchorComponent,
  ],
  imports: [
    CommonModule,
  ],
})
export class ButtonModule {
}
