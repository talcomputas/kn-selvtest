import { Answer } from '@features/questions/interfaces/answer.interface';
import { OptionSize } from '@features/questions/enums/option-size.enum';
import { QuestionInfo } from '@features/questions/interfaces/question-info.interface';
import { QuestionBase } from '@features/questions/interfaces/question-base.interface';
import { SliderOption } from '@features/questions/interfaces/slider-option.interface';

export interface QuestionSlider extends QuestionBase {
  text: string;
  answer: Answer<number, number>;
  options: SliderOption;
  optionSize?: OptionSize;
  title?: string;
  info?: QuestionInfo;
  calculator?: boolean;
}
