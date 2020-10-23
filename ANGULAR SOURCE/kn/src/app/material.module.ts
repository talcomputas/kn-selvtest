import { NgModule } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { MatListModule } from '@angular/material/list';

@NgModule({
  imports: [MatButtonModule, MatCardModule, MatIconModule, MatListModule],
  exports: [MatButtonModule, MatCardModule, MatIconModule, MatListModule],
})
export class MaterialModule {}
