import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { QuestionComponentBaseDirective } from '@features/questions/components/question-component-base.directive';
import { QuestionMultiple } from '@features/questions/interfaces/question-multiple.interface';

@Component({
  selector: 'app-question-multiple',
  templateUrl: './question-multiple.component.html',
  styleUrls: ['./question-multiple.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class QuestionMultipleComponent extends QuestionComponentBaseDirective<QuestionMultiple> {
  @Input()
  public readonly limit: number;
}
