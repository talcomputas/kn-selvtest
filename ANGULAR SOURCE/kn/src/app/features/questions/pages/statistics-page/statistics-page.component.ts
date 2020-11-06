import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { StatisticsService } from '@features/questions/services/statistics.service';

@Component({
  selector: 'app-statistics-page',
  templateUrl: './statistics-page.component.html',
  styleUrls: ['./statistics-page.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class StatisticsPageComponent implements OnInit {

  itemData: Array<string>

  constructor(private statisticsService: StatisticsService) { }

  ngOnInit(): void {
    this.statisticsService.getBaseData().subscribe(itemData => {
      this.itemData = itemData
    });
  }

}
