import { QuestionBase } from '../interfaces/question-base.interface';
import { QuestionInfo } from '../interfaces/question-info.interface';
import { Answer } from '@features/questions/interfaces/answer.interface';
import { Option } from '@features/questions/interfaces/option.interface';

export interface QuestionRanking extends QuestionBase {
  text: string;
  options: Option[];
  answer: Answer<number[], number>;
  title?: string;
  info?: QuestionInfo;
}
