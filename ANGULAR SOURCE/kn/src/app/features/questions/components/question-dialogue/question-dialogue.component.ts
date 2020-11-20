import { ChangeDetectionStrategy, Component, HostBinding, OnChanges } from '@angular/core';
import { DomSanitizer, SafeStyle } from '@angular/platform-browser';
import { QuestionComponentBaseDirective } from '@features/questions/components/question-component-base.directive';
import { QuestionDialogue } from '@features/questions/interfaces/question-dialogue.interface';
import { SpeechBase } from '@features/questions/interfaces/speech-base.interface';
import { SpeechFunnel } from '@features/questions/interfaces/speech-funnel.interface';
import { SpeechSelect } from '@features/questions/interfaces/speech-select.interface';
import { SpeechType } from '@features/questions/enums/speech-type.enum';
import { Utils } from '@content/utils/utils';

@Component({
  selector: 'app-question-dialogue',
  templateUrl: './question-dialogue.component.html',
  styleUrls: ['./question-dialogue.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class QuestionDialogueComponent
  extends QuestionComponentBaseDirective<QuestionDialogue>
  implements OnChanges {
  public readonly SpeechType = SpeechType;
  public speech: SpeechBase | SpeechFunnel | SpeechSelect;

  private value: string[] = [];

  @HostBinding('style.background-image')
  public backgroundImage: SafeStyle;

  constructor(private sanitizer: DomSanitizer) {
    super();
  }

  ngOnChanges(): void {
    this.initSpeech();
  }

  onSelectOption(option: SpeechFunnel): void {
    this.value.push(option.id);
    this.next(option.next);
  }

  next(id: string): void {
    this.speech = this.getById(id);

    if (this.speech.type === SpeechType.COMPLETION) {
      this.finish();
    }
  }

  getById(id: string): SpeechBase | SpeechFunnel | SpeechSelect {
    return Utils.ensure(this.question.speech.find((item) => item.id === id));
  }

  private finish(): void {
    this.form.patchValue({ [this.question.id]: this.value });
  }

  private initSpeech(): void {
    this.speech = Utils.ensure(
      this.question.speech.find(
        (item) => item.type === SpeechType.INTRO || item.type === SpeechType.QUESTION,
      ),
    );
    if (this.question.image) {
      this.backgroundImage = this.sanitizer.bypassSecurityTrustStyle(
        `url(assets/images/${this.question.image})`,
      );
    }

    this.value = [];
  }
}
