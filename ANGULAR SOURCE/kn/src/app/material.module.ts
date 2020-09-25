import { NgModule } from '@angular/core';
import {
  MatBadgeModule,
  MatIconModule,
  MatToolbarModule,
  MatButtonModule,
} from '@angular/material';

@NgModule({
  imports: [MatToolbarModule, MatIconModule, MatBadgeModule, MatButtonModule],
  exports: [MatToolbarModule, MatIconModule, MatBadgeModule, MatButtonModule],
})
export class MaterialModule {}
