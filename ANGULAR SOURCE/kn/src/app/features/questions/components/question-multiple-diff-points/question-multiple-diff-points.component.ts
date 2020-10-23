import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { QuestionComponentBaseDirective } from '@features/questions/components/question-component-base.directive';
import { QuestionMultipleDiffPoints } from '@features/questions/interfaces/question-multiple.interface';

@Component({
  selector: 'app-question-multiple-diff-points',
  templateUrl: './question-multiple-diff-points.component.html',
  styleUrls: ['./question-multiple-diff-points.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class QuestionMultipleDiffPointsComponent extends QuestionComponentBaseDirective<
  QuestionMultipleDiffPoints
> {
  readonly limit = 1;
}
