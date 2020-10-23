import { ChangeDetectionStrategy, Component, OnChanges } from '@angular/core';
import { QuestionSingle } from '@features/questions/interfaces/question-single.interface';
import { QuestionComponentBaseDirective } from '@features/questions/components/question-component-base.directive';

@Component({
  selector: 'app-question-single',
  templateUrl: './question-single.component.html',
  styleUrls: ['./question-single.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class QuestionSingleComponent
  extends QuestionComponentBaseDirective<QuestionSingle>
  implements OnChanges {
  public optionsClassName: 'text' | 'image' | 'audio';
  public optionSizeClassName: string;

  ngOnChanges(): void {
    super.ngOnChanges();
    this.optionSizeClassName = (this.question.optionSize || '').toLowerCase();
    this.optionsClassName = this.resolveOptionsType();
  }

  private resolveOptionsType(): 'text' | 'image' | 'audio' {
    const check = (propName: string) =>
      this.question.options.every((option) => option.hasOwnProperty(propName));

    if (check('text')) {
      return 'text';
    }

    if (check('image')) {
      return 'image';
    }

    if (check('audio')) {
      return 'audio';
    }

    return null;
  }
}
