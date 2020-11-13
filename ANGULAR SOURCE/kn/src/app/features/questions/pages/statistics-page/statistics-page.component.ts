import { Component, OnInit, ChangeDetectionStrategy, ViewChild } from '@angular/core';
import { StatisticsService } from '@features/questions/services/statistics.service';
import { MatDatepicker } from '@angular/material/datepicker';
import { FormControl } from '@angular/forms';
import { AngularCsv } from 'angular-csv-ext/dist/Angular-csv';
import { MatSelect } from '@angular/material/select';
import { Statistics } from '@features/questions/interfaces/statistics.interface';

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
    quoteStrings: "",
    decimalSeparator: '.',
    showLabels: true,
    showTitle: true,
    title: 'Statistikk',
    useBom: true,
    noDownload: false,
    headers: ['answer', 'correct', 'correctanswer', 'datecreated', 'id', 'itemid', 'name', 'time', 'timeout', 'totaltime', 'uid', 'ver'],
  };

  constructor(private statisticsService: StatisticsService) {
  }

  exportCsv() {
    this.statisticsService.getBaseData(
      this.fromDateControl.value.toString(),
      this.toDateControl.value.toString(),
      this.selectedTest)
      .subscribe(itemData => {
        itemData = JSON.parse(itemData);
        Object.keys(itemData).forEach(line => {
          Object.keys(itemData[line]).forEach(value => {
            if (itemData[line][value]) {
              itemData[line][value] = itemData[line][value].toString().replaceAll(',', ' ')
            }
          })
        })
        // tslint:disable-next-line:no-unused-expression
        new AngularCsv(itemData, 'Statistikk', this.csvOptions);
      });
  }

  ngOnInit(): void {
  }


}
