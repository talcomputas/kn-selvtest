import { QuestionBase } from './question-base.interface';
import { QuestionInfo } from './question-info.interface';
import { Answer } from '@features/questions/interfaces/answer.interface';
import { Option } from '@features/questions/interfaces/option.interface';
import { AnswerWithMultiplePoints } from '@features/questions/interfaces/answer-multiple-points.interface';

export interface QuestionMultipleChoice extends QuestionBase<AnswerWithMultiplePoints> {
  text: string;
  answer: AnswerWithMultiplePoints;
  options: Option[];
  title?: string;
  info?: QuestionInfo;
}
