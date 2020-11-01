import { QuestionBase } from './question-base.interface';
import { QuestionInfo } from './question-info.interface';
import { Answer } from '@features/questions/interfaces/answer.interface';
import { Options } from '@features/questions/interfaces/options.interface';

export interface QuestionGroupsChoice extends QuestionBase {
  title?: string;
  text: string;
  options: Options;
  answer: Answer<number[], number>;
}
