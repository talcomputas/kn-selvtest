import { ChangeDetectionStrategy, Component, OnChanges } from '@angular/core';
import { QuestionComponentBaseDirective } from '@features/questions/components/question-component-base.directive';
import { QuestionMultipleChoice } from '@features/questions/interfaces/question-multiplechoice.interface';

@Component({
  selector: 'app-question-multiplechoice',
  templateUrl: './question-multiplechoice.component.html',
  styleUrls: ['./question-multiplechoice.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class QuestionMultipleChoiceComponent
  extends QuestionComponentBaseDirective<QuestionMultipleChoice>
  implements OnChanges {
  public optionsClassName: 'text' | 'image' | 'audio';
  public optionSizeClassName: string;

  ngOnChanges(): void {
    super.ngOnChanges();
    this.optionsClassName = 'text';
  }

  getSplitText(value: string): (string | number)[] {
    const ary = value.split('%s');

    let result: (string | number)[] = [];

    for (let i = 0; i < ary.length; i++) {
      if (ary[i] === '' && i < ary.length - 1) {
        result.push(i);
      } else {
        result.push(ary[i]);
        if (i < ary.length - 1) {
          result.push(i);
        }
      }
    }

    result = result.filter((e) => {
      return e === 0 || e;
    });
    return result;
  }
}
