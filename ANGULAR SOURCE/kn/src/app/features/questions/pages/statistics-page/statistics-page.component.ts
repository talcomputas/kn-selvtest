import { Component, OnInit, ChangeDetectionStrategy, ViewChild } from '@angular/core';
import { StatisticsService } from '@features/questions/services/statistics.service';
import { MatDatepicker } from '@angular/material/datepicker';
import { FormControl } from '@angular/forms';
import { AngularCsv } from 'angular-csv-ext/dist/Angular-csv'

@Component({
  selector: 'app-statistics-page',
  templateUrl: './statistics-page.component.html',
  styleUrls: ['./statistics-page.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class StatisticsPageComponent implements OnInit {

  @ViewChild(MatDatepicker) fromDate: MatDatepicker<Date>;
  @ViewChild(MatDatepicker) toDate: MatDatepicker<Date>;
  itemData: Array<any>;

  fromDateControl = new FormControl(new Date());
  toDateControl = new FormControl(new Date());

  csvOptions = {
    fieldSeparator: ',',
    quoteStrings: "",
    decimalSeparator: '.',
    showLabels: true,
    showTitle: true,
    title: 'Statistikk',
    useBom: true,
    noDownload: false,
    headers: ["answer", "correct", "correctanswer", "datecreated", "id", "itemid", "time", "timeout", "totaltime", "uid"],
  };

  constructor(private statisticsService: StatisticsService) {
  }

  ngOnInit(): void {
    this.statisticsService.getBaseData().subscribe(itemData => {
      console.log(itemData);
      this.itemData = itemData;
    });
  }

  exportCsv() {
    // tslint:disable-next-line:no-unused-expression
    new AngularCsv(this.itemData, "Statistikk", this.csvOptions)
  }
}
