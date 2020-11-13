import { NgModule } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { MatListModule } from '@angular/material/list';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MAT_DATE_LOCALE, MatNativeDateModule, MatOptionModule } from '@angular/material/core';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';

@NgModule({
  imports: [MatButtonModule, MatCardModule, MatIconModule, MatListModule, MatDatepickerModule, MatNativeDateModule, MatInputModule, MatSelectModule, MatOptionModule],
  exports: [MatButtonModule, MatCardModule, MatIconModule, MatListModule],
  providers: [{provide: MAT_DATE_LOCALE, useValue: 'no-nb'}]
})
export class MaterialModule {
}
