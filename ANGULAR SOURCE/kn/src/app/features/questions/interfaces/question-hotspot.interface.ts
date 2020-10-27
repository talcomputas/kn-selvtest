import { QuestionBase } from '../interfaces/question-base.interface';
import { QuestionInfo } from '../interfaces/question-info.interface';
import { Answer } from '@features/questions/interfaces/answer.interface';

export interface QuestionHotspot extends QuestionBase {
  text: string;
  image: string;
  answer: Answer<number>;
  options: { id: number; x: number; y: number; width: number; height: number }[];
  info?: QuestionInfo;
  title?: string;
}
