import { QuestionBase } from './question-base.interface';
import { QuestionInfo } from './question-info.interface';
import { Answer } from '@features/questions/interfaces/answer.interface';
import { Options } from '@features/questions/interfaces/options.interface';

export interface QuestionGroupsChoice extends QuestionBase {
  text: string;
  answer: Answer<number[]>;
  options: Options;
  title?: string;
  info?: QuestionInfo;
}
