import { ChangeDetectionStrategy, Component, EventEmitter, Input, Output } from '@angular/core';
import { ResultAnswer } from '@features/questions/interfaces/result-answer.interface';
import { QuestionType } from '@features/questions/enums/question-type.enum';
import { SpeechType } from '@features/questions/enums/speech-type.enum';

@Component({
  selector: 'app-answers',
  templateUrl: './answers.component.html',
  styleUrls: ['./answers.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AnswersComponent {
  public readonly QuestionType = QuestionType;
  public readonly SpeechType = SpeechType;

  @Output()
  public readonly close = new EventEmitter<void>();

  @Input()
  public readonly data: ResultAnswer[];

  public onPrint(): void {
    window.print();
  }

  getSplitText(value: string): any[] {
    const ary = value.split('%s');

    let result = [];

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

  isNumeric(value: any): boolean {
    return /^\d+$/.test(value);
  }
}
