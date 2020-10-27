import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { QuestionComponentBase } from '@features/questions/components/question-component-base';
import { QuestionMultiple } from '@features/questions/interfaces/question-multiple.interface';

@Component({
  selector: 'app-question-multiple',
  templateUrl: './question-multiple.component.html',
  styleUrls: ['./question-multiple.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class QuestionMultipleComponent extends QuestionComponentBase<QuestionMultiple> {
  @Input()
  public readonly limit: number;
}
