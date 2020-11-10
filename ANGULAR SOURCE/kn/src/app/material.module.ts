import { NgModule } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { MatListModule } from '@angular/material/list';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { MatInputModule } from '@angular/material/input';

@NgModule({
  imports: [MatButtonModule, MatCardModule, MatIconModule, MatListModule, MatDatepickerModule, MatNativeDateModule, MatInputModule],
  exports: [MatButtonModule, MatCardModule, MatIconModule, MatListModule],
})
export class MaterialModule {}
