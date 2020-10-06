import { QuestionBase } from './question-base.interface';
import { QuestionInfo } from './question-info.interface';
import { Answer } from '@features/questions/interfaces/answer.interface';
import { Option } from '@features/questions/interfaces/option.interface';

export interface QuestionMultipleChoice extends QuestionBase {
  text: string;
  answer: Answer<number[]>;
  options: [Option[]];
  title?: string;
  info?: QuestionInfo;
}
