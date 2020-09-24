import { QuestionBase } from '../interfaces/question-base.interface';
import { QuestionInfo } from '../interfaces/question-info.interface';
import { Answer } from '@features/questions/interfaces/answer.interface';
import { Option } from '@features/questions/interfaces/option.interface';
import { OptionSize } from '@features/questions/enums/option-size.enum';

export interface QuestionSingle extends QuestionBase {
  text: string;
  answer: Answer<number>;
  options: Option[];
  optionSize?: OptionSize;
  title?: string;
  info?: QuestionInfo;
}
