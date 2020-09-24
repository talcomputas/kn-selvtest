import { QuestionType } from '@features/questions/enums/question-type.enum';
import { SpeechBase } from '@features/questions/interfaces/speech-base.interface';

export interface ResultAnswer<O = any> {
  id: number;
  type: QuestionType;
  correct: O;
  selected: O;
  isCorrect: boolean;
  speech?: SpeechBase[];
  text?: string;
  image?: string;
}
