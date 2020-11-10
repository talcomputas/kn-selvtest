import { Component, OnInit, ChangeDetectionStrategy, ViewChild } from '@angular/core';
import { StatisticsService } from '@features/questions/services/statistics.service';
import { MatDatepicker } from '@angular/material/datepicker';
import { FormControl } from '@angular/forms';
import { AngularCsv } from 'angular-csv-ext/dist/Angular-csv';
import { MatSelect } from '@angular/material/select';

@Component({
  selector: 'app-statistics-page',
  templateUrl: './statistics-page.component.html',
  styleUrls: ['./statistics-page.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class StatisticsPageComponent implements OnInit {

  @ViewChild(MatDatepicker) fromDate: MatDatepicker<Date>;
  @ViewChild(MatDatepicker) toDate: MatDatepicker<Date>;

  selectedTest = 'regnesjekk';

  fromDateControl = new FormControl(new Date());
  toDateControl = new FormControl(new Date());

  csvOptions = {
    fieldSeparator: ',',
    quoteStrings: '',
    decimalSeparator: '.',
    showLabels: true,
    showTitle: true,
    title: 'Statistikk',
    useBom: true,
    noDownload: false,
    headers: ['answer', 'correct', 'correctanswer', 'datecreated', 'id', 'itemid', 'time', 'timeout', 'totaltime', 'uid'],
  };

  constructor(private statisticsService: StatisticsService) {
  }

  ngOnInit(): void {
  }


  exportCsv() {
    this.statisticsService.getBaseData(
      this.fromDateControl.value.toString(),
      this.toDateControl.value.toString(),
      this.selectedTest)
      .subscribe(itemData => {
        console.log(itemData);
        // tslint:disable-next-line:no-unused-expression
        new AngularCsv(itemData, 'Statistikk', this.csvOptions);
      });
  }
}
