import { ChangeDetectionStrategy, Component, OnChanges } from '@angular/core';
import { QuestionComponentBaseDirective } from '@features/questions/components/question-component-base.directive';
import { QuestionGrading } from '@features/questions/interfaces/question-grading.interface';

@Component({
  selector: 'app-question-grading',
  templateUrl: './question-grading.component.html',
  styleUrls: ['./question-grading.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class QuestionGradingComponent
  extends QuestionComponentBaseDirective<QuestionGrading>
  implements OnChanges {
  public optionsClassName: 'text' | 'image' | 'audio';

  ngOnChanges(): void {
    super.ngOnChanges();
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
