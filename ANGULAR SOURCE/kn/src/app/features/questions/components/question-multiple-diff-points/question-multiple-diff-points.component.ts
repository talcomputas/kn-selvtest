import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { QuestionComponentBase } from '@features/questions/components/question-component-base';
import { QuestionMultipleDiffPoints } from '@features/questions/interfaces/question-multiple.interface';

@Component({
  selector: 'app-question-multiple-diff-points',
  templateUrl: './question-multiple-diff-points.component.html',
  styleUrls: ['./question-multiple-diff-points.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class QuestionMultipleDiffPointsComponent extends QuestionComponentBase<
  QuestionMultipleDiffPoints
> {
  readonly limit = 1;
}
