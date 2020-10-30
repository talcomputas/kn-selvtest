import { QuestionType } from '@features/questions/enums/question-type.enum';
import { Answer } from '@features/questions/interfaces/answer.interface';
import { Transition } from '@features/questions/interfaces/transition.interface';

export interface QuestionBase<T = Answer> {
  id: number;
  type: QuestionType;
  answer: T;
  transition?: Transition;
  audio?: string;
  image?: string;
  video?: { url: string; autoplay: boolean; controls: boolean; loop: boolean };
}
