import { Component, OnInit } from '@angular/core';
import { delay } from 'rxjs/operators';
import { LoadingService } from 'services/loading.service';

@Component({
  selector: 'app-root',
  styleUrls: ['./app.component.scss'],
  templateUrl: './app.component.html',
})
export class AppComponent implements OnInit {
  loading = false;

  constructor(private loadingService: LoadingService) {}
  ngOnInit(): void {
    this.listenToLoading();
  }

  listenToLoading(): void {
    this.loadingService.loadingSub
      .pipe(delay(0)) // This prevents a ExpressionChangedAfterItHasBeenCheckedError for subsequent requests
      .subscribe((loading: boolean) => {
        this.loading = loading;
      });
  }
}
