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
}
