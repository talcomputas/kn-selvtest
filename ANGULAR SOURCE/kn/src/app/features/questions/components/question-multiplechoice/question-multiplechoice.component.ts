import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { QuestionComponentBase } from '@features/questions/components/question-component-base';
import { QuestionMultipleChoice } from '@features/questions/interfaces/question-multiplechoice.interface';

@Component({
  selector: 'app-question-multiplechoice',
  templateUrl: './question-multiplechoice.component.html',
  styleUrls: ['./question-multiplechoice.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class QuestionMultipleChoiceComponent extends QuestionComponentBase<QuestionMultipleChoice> {
  @Input()
  public readonly limit: number;

  getOptions(text: string) {
    var options = ["<h4>Trond<h4>", "<h4>sir!<h4>", "<h4>Foo<h4>", "<h4>bar<h4>"]
    for (var i = 0; i < options.length; i++) {
      text = text.replace('%s', options[i]);
    }
    return text
  }

}