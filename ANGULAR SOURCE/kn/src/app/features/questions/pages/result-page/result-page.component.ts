import { Component, ChangeDetectionStrategy, OnDestroy } from '@angular/core';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { Result } from '@features/questions/interfaces/result.interface';
import { QuestionsService } from '@features/questions/services/questions.service';

@Component({
  selector: 'app-result-page',
  templateUrl: './result-page.component.html',
  styleUrls: ['./result-page.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ResultPageComponent implements OnDestroy {
  public showAnswers: boolean;
  public result: Result;

  private readonly destroyed$ = new Subject<void>();

  constructor(private questionsService: QuestionsService) {
    this.result = this.questionsService.result();
    this.questionsService.attach();
    this.questionsService.changes$.pipe(takeUntil(this.destroyed$)).subscribe(() => this.result = this.questionsService.result());
  }

  ngOnDestroy(): void {
    this.destroyed$.next();
    this.destroyed$.complete();
    this.questionsService.detach();
  }
}
