import {
  ChangeDetectionStrategy,
  Component,
  Input,
  OnChanges,
} from '@angular/core';
import { QuestionComponentBase } from '@features/questions/components/question-component-base';
import { QuestionMultipleChoice } from '@features/questions/interfaces/question-multiplechoice.interface';

@Component({
  selector: 'app-question-multiplechoice',
  templateUrl: './question-multiplechoice.component.html',
  styleUrls: ['./question-multiplechoice.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class QuestionMultipleChoiceComponent
  extends QuestionComponentBase<QuestionMultipleChoice>
  implements OnChanges {
  @Input()
  public readonly limit: number;

  ngOnChanges(): void {
    super.ngOnChanges();
  }

  getOptions(text: string) {
    return text;
  }

  getSplitText(value: string) {
    const ary = value.split('%s');

    let result = [];

    for (let i = 0; i < ary.length; i++) {
      if (ary[i] === '' && i < ary.length - 1) {
        result.push('%s');
      } else {
        result.push(ary[i]);
        if (i < ary.length - 1) {
          result.push('%s');
        }
      }
    }

    result = result.filter((e) => {
      return e === 0 || e;
    });

    return result;
  }
}
