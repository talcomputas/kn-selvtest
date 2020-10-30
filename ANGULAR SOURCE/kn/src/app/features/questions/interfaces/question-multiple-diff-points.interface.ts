import { AnswerWithMultiplePoints } from '@features/questions/interfaces/answer-multiple-points.interface';
import { QuestionBase } from '@features/questions/interfaces/question-base.interface';
import { QuestionInfo } from '@features/questions/interfaces/question-info.interface';
import { Option } from '@features/questions/interfaces/option.interface';
import { Answer } from '@features/questions/interfaces/answer.interface';

export interface QuestionMultipleDiffPoints extends QuestionBase<AnswerWithMultiplePoints> {
  text: string;
  answer: Answer<number[], number[]>;
  options: Option[];
  title?: string;
  info?: QuestionInfo;
}
