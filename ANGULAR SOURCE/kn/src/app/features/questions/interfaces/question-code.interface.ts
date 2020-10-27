import { QuestionInfo } from '../interfaces/question-info.interface';
import { QuestionBase } from '../interfaces/question-base.interface';
import { Answer } from '@features/questions/interfaces/answer.interface';

export interface QuestionCode extends QuestionBase {
  text: string;
  answer: Answer<number>;
  title?: string;
  info?: QuestionInfo;
}
