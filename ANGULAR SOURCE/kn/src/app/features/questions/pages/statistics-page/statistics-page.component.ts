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

  itemDataCsvOptions = {
    fieldSeparator: ',',
    quoteStrings: '',
    decimalSeparator: '.',
    showLabels: true,
    showTitle: true,
    title: 'Statistikk',
    useBom: true,
    noDownload: false,
    headers: ['answer', 'correct', 'correctanswer', 'datecreated', 'id', 'itemid', 'name', 'time', 'timeout', 'totaltime', 'uid', 'ver'],
  };

  defaultCsvOptions = {
    fieldSeparator: ',',
    quoteStrings: '',
    decimalSeparator: '.',
    showLabels: true,
    showTitle: true,
    title: 'Statistikk',
    useBom: true,
    noDownload: false,
  };

  constructor(private statisticsService: StatisticsService) {
  }

  exportCsv() {
    this.statisticsService.getBaseData(
      this.fromDateControl.value.toString(),
      this.toDateControl.value.toString(),
      this.selectedTest)
      .subscribe(itemData => {
        itemData = this.removeCommas(itemData);
        // tslint:disable-next-line:no-unused-expression
        new AngularCsv(itemData, 'Statistikk', this.itemDataCsvOptions);
      });
  }

  ngOnInit(): void {
  }


  exportTotalTestsPerDay() {
    this.statisticsService.getTotalTestsPerDay(
      this.fromDateControl.value.toString(),
      this.toDateControl.value.toString())
      .subscribe(itemData => {
        itemData = this.removeCommas(itemData);

        console.log(itemData);
        // tslint:disable-next-line:no-unused-expression
        new AngularCsv(itemData, 'Summary', this.defaultCsvOptions);
      });
  }

  exportTestsPerDate() {
    this.statisticsService.getTestsPerDay(
      this.fromDateControl.value.toString(),
      this.toDateControl.value.toString(),
    ).subscribe(data => {
      data = JSON.parse(data);
      const dates: Array<string> = [];
      const tests: Array<string> = [];
      Object.keys(data).forEach(line => {
        const tmp = line.split('-');
        const date = tmp[0];
        const test = tmp[1];
        if (!dates.includes(date)) dates.push(date);
        if (!tests.includes(test)) tests.push(test);
      });

      const csv: any[][] = new Array(dates.length)
        .fill(0)
        .map(() => new Array(tests.length + 1));

      for (let i = 0; i < dates.length; i++) {
        csv[i][0] = dates[i]
      }

      Object.keys(data).forEach(dateTest => {
        const val = data[dateTest]

        const tmp = dateTest.split("-");
        const date = tmp[0];
        const test = tmp[1];
        const c = tests.indexOf(test)
        const r = dates.indexOf(date);
        csv[r][c+1] = val;
      })

      tests.unshift("dato")

      const csvOptions = {
        fieldSeparator: ',',
        quoteStrings: '',
        decimalSeparator: '.',
        showLabels: true,
        showTitle: true,
        title: 'Statistikk',
        useBom: true,
        noDownload: false,
        headers: tests,
      };

      // tslint:disable-next-line:no-unused-expression
      new AngularCsv(csv, 'Test', csvOptions);
    });
  }

  private removeCommas(itemData: any): JSON {
    itemData = JSON.parse(itemData);
    Object.keys(itemData).forEach(line => {
      Object.keys(itemData[line]).forEach(value => {
        if (itemData[line][value]) {
          itemData[line][value] = itemData[line][value].toString().replaceAll(',', ' ');
        }
      });
    });

    return itemData;
  }

  exportTest() {
    const csvOptions = {
      fieldSeparator: ',',
      quoteStrings: '',
      decimalSeparator: '.',
      showLabels: true,
      showTitle: true,
      title: 'Statistikk',
      useBom: true,
      noDownload: false,
      headers: ['dato', 'lesetesten', 'digitaltesten', 'regnetesten', 'test1', 'test2'],
    };

    const data: Array<Array<any>> = [
      ['01.11.2020', this.rnd(), this.rnd(), this.rnd(), this.rnd(), this.rnd()],
      ['02.11.2020', this.rnd(), this.rnd(), this.rnd(), this.rnd(), this.rnd()],
      ['03.11.2020', this.rnd(), this.rnd(), this.rnd(), this.rnd(), this.rnd()],
      ['04.11.2020', this.rnd(), this.rnd(), this.rnd(), this.rnd(), this.rnd()],
      ['05.11.2020', this.rnd(), this.rnd(), this.rnd(), this.rnd(), this.rnd()],
      ['06.11.2020', this.rnd(), this.rnd(), this.rnd(), this.rnd(), this.rnd()],
      ['07.11.2020', this.rnd(), this.rnd(), this.rnd(), this.rnd(), this.rnd()],
      ['08.11.2020', this.rnd(), this.rnd(), this.rnd(), this.rnd(), this.rnd()],
    ];

    // tslint:disable-next-line:no-unused-expression
    new AngularCsv(data, 'Test', csvOptions);
  }

  rnd(): number {
    return Math.floor(Math.random() * 100);
  }
}
