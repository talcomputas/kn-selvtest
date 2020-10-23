import { Component, ChangeDetectionStrategy } from '@angular/core';
import { QuestionComponentBaseDirective } from '@features/questions/components/question-component-base.directive';
import { QuestionCode } from '@features/questions/interfaces/question-code.interface';

@Component({
  selector: 'app-question-code',
  templateUrl: './question-code.component.html',
  styleUrls: ['./question-code.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class QuestionCodeComponent extends QuestionComponentBaseDirective<QuestionCode> {}
