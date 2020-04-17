import { ChangeDetectionStrategy, ChangeDetectorRef, Component, OnDestroy, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { Observable, Subject } from 'rxjs';
import { map, takeUntil } from 'rxjs/operators';
import { QuestionType } from '@features/questions/enums/question-type.enum';
import { QuestionsService } from '@features/questions/services/questions.service';
import { QuestionsUnionType } from '@features/questions/types/questions-union.type';

@Component({
  selector: 'app-questions-page',
  templateUrl: './questions-page.component.html',
  styleUrls: ['./questions-page.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class QuestionsPageComponent implements OnInit, OnDestroy {
  public readonly QuestionType = QuestionType;
  public readonly questions = new FormGroup({});

  public readonly page$: Observable<number>;
  public readonly index$: Observable<number>;
  public readonly length$: Observable<number>;
  public readonly question$: Observable<QuestionsUnionType>;

  public showTransition: boolean;

  private readonly destroyed$ = new Subject<void>();

  constructor(private route: ActivatedRoute,
              private cdRef: ChangeDetectorRef,
              private questionsService: QuestionsService) {
    this.page$ = this.route.paramMap.pipe(map((params: ParamMap) => +params.get('page')));
    this.index$ = this.page$.pipe(map((page: number) => page - 1));
    this.question$ = this.questionsService.question$;
    this.length$ = this.questionsService.length$;
  }

  ngOnInit(): void {
    this.questionsService.attach();
    this.questionsService.changes$.pipe(takeUntil(this.destroyed$)).subscribe(() => this.cdRef.markForCheck());

    this.index$.pipe(takeUntil(this.destroyed$)).subscribe((index: number) => this.questionsService.update(index, this.questions.value));

    this.question$.pipe(takeUntil(this.destroyed$)).subscribe((question: QuestionsUnionType) => {
      this.handleTransition(question);
      this.addFormControl(question);
    });
  }

  ngOnDestroy(): void {
    this.destroyed$.next();
    this.destroyed$.complete();
    this.questionsService.detach();
  }

  finish(): void {
    this.questionsService.update(null, this.questions.value);
  }

  private handleTransition(question: QuestionsUnionType): void {
    if (question && question.transition) {
      this.showTransition = true;
    }
  }

  private addFormControl(question: QuestionsUnionType): void {
    const key = String(question && question.id);

    if (this.questions.contains(key)) {
      return;
    }

    this.questions.addControl(key, new FormControl(null, [Validators.required]));
  }
}
