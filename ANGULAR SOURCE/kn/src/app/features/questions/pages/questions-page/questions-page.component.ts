import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  OnDestroy,
  OnInit,
} from '@angular/core';
import { FormArray, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, ParamMap, Router } from '@angular/router';
import { Observable, Subject } from 'rxjs';
import { map, takeUntil } from 'rxjs/operators';
import { QuestionType } from '@features/questions/enums/question-type.enum';
import { QuestionsService } from '@features/questions/services/questions.service';
import { QuestionsUnionType } from '@features/questions/types/questions-union.type';
import { QuestionGroupsChoice } from '@features/questions/interfaces/question-groups-choice.interface';
import { QuestionSlider } from '@features/questions/interfaces/question-slider.interface';
import { ContentService } from '@content/services/content.service';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';

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

  public numberOfQuestions = 0;
  public questionIndex = 0;

  public showTransition: boolean;
  path: string;

  private readonly destroyed$ = new Subject<void>();
  constructor(
    private route: ActivatedRoute,
    private cdRef: ChangeDetectorRef,
    private questionsService: QuestionsService,
    private router: Router,
    private content: ContentService,
    private countdownDialog: MatDialog,
  ) {
    this.page$ = this.route.paramMap.pipe(
      map((params: ParamMap) => {
        const pageNumber = params.get('page');
        if (pageNumber) {
          return +pageNumber;
        }
        return 0;
      }),
    );
    this.index$ = this.page$.pipe(
      map((page: number) => {
        this.questionIndex = page;
        return page - 1;
      }),
    );
    this.question$ = this.questionsService.question$;
    this.length$ = this.questionsService.length$;
    this.questionsService.length$.subscribe((nr: number) => {
      this.numberOfQuestions = nr;
    });
  }

  hasTimer(): boolean {
    let retVal = false;
    try {
      if (this.content.get('timer')) {
        retVal = true;
      } else {
        retVal = false;
      }
    } catch (error) {
      retVal = false;
    }

    return retVal;
  }

  ngOnInit(): void {
    this.path = this.route.snapshot.data.path;
    this.questionsService.attach();
    this.questionsService.changes$
      .pipe(takeUntil(this.destroyed$))
      .subscribe(() => this.cdRef.markForCheck());

    this.index$.pipe(takeUntil(this.destroyed$)).subscribe((index: number) => {
      return this.questionsService.update(index, this.questions.value, this.path);
    });

    this.question$.pipe(takeUntil(this.destroyed$)).subscribe((question: QuestionsUnionType) => {
      this.handleTransition(question);
      this.addFormControl(question);
    });
  }

  handleCountdown($event: any) {
    if ($event.action === 'done') {
      this.destroyed$.next();
      this.destroyed$.complete();
      this.questionsService.detach();

      const dialogRef = this.countdownDialog.open(CountdownDialogComponent, {
        width: '250px',
        data: { name: 'foo', animal: 'bar' },
      });

      dialogRef.afterClosed().subscribe((result) => {
        console.log('The dialog was closed');
        this.router.navigate(['/lesetesten']);
      });
    }
  }

  ngOnDestroy(): void {
    this.destroyed$.next();
    this.destroyed$.complete();
    this.questionsService.detach();
  }

  finish(): void {
    // @ts-ignore
    this.questionsService.update(null, this.questions.value, this.path);
  }

  getProgressAsPercent(): number {
    return Math.ceil((this.questionIndex / this.numberOfQuestions) * 100);
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

    if (question.type === QuestionType.GROUPS_CHOICE) {
      const q = question as QuestionGroupsChoice;
      const skills = new FormArray([]);
      q.options.forEach(() => {
        skills.push(new FormControl('', Validators.required));
      });
      this.questions.addControl(key, skills);
      return;
    }

    if (question.type === QuestionType.SLIDER) {
      const q = question as QuestionSlider;
      this.questions.addControl(
        key,
        new FormControl(null, [
          Validators.required,
          Validators.min(q.options.floor),
          Validators.max(q.options.ceil),
        ]),
      );
      return;
    }

    this.questions.addControl(key, new FormControl(null, [Validators.required]));
  }
}

@Component({
  selector: 'app-countdown-dialog',
  templateUrl: 'countdown-dialog.html',
})
export class CountdownDialogComponent {
  constructor(public dialogRef: MatDialogRef<CountdownDialogComponent>) {}

  onNoClick(): void {
    this.dialogRef.close();
  }
}
