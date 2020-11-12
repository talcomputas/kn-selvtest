import { DOCUMENT } from '@angular/common';
import { Component, Inject, OnInit, Renderer2 } from '@angular/core';
import { delay } from 'rxjs/operators';
import { LoadingService } from 'services/loading.service';

@Component({
  selector: 'app-root',
  styleUrls: ['./app.component.scss'],
  templateUrl: './app.component.html',
})
export class AppComponent implements OnInit {
  breakpointClass = '';
  loading = false;

  constructor(
    @Inject(DOCUMENT) private document: Document,
    private renderer: Renderer2,
    private loadingService: LoadingService,
  ) {}
  ngOnInit(): void {
    // this.renderer.setAttribute(this.document.body, 'class', this.class);
    this.listenToLoading();
  }

  listenToLoading(): void {
    this.loadingService.loadingSub
      .pipe(delay(0)) // This prevents a ExpressionChangedAfterItHasBeenCheckedError for subsequent requests
      .subscribe((loading: boolean) => {
        this.loading = loading;
      });
  }
  switchMode(newClass: string) {
    this.renderer.setAttribute(
      this.document.body,
      'class',
      'mat-typography mat-app-background ' + newClass,
    );
  }
}
