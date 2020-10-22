import { QuestionBase } from '../interfaces/question-base.interface';
import { QuestionInfo } from '../interfaces/question-info.interface';
import { Answer } from '@features/questions/interfaces/answer.interface';
import { Option } from '@features/questions/interfaces/option.interface';

export interface QuestionMultiple extends QuestionBase {
  text: string;
  answer: Answer<number[]>;
  options: Option[];
  title?: string;
  info?: QuestionInfo;
}

export interface QuestionMultipleDiffPoints extends QuestionBase {
  text: string;
  answer: Answer<number[]>;
  options: Option[];
  title?: string;
  info?: QuestionInfo;
}
