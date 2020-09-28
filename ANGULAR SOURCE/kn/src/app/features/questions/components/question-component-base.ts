import { Input, OnChanges, Directive } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { QuestionBase } from '@features/questions/interfaces/question-base.interface';

@Directive()
export class QuestionComponentBase<T = QuestionBase> implements OnChanges {
  @Input()
  public readonly question: T & QuestionBase;

  @Input()
  public readonly form: FormGroup;

  public control: FormControl;

  ngOnChanges(): void {
    if (!this.question || !this.form) {
      return;
    }

    const { id } = this.question;
    const controlName = String(id);
    this.control = this.form.get(controlName) as FormControl;
  }
}
