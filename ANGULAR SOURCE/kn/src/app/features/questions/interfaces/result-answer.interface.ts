import { QuestionType } from '@features/questions/enums/question-type.enum';
import { SpeechBase } from '@features/questions/interfaces/speech-base.interface';
import { SpeechFunnel } from '@features/questions/interfaces/speech-funnel.interface';
import { SpeechSelect } from '@features/questions/interfaces/speech-select.interface';

export interface ResultAnswer<O = any> {
  id: number;
  type: QuestionType;
  correct: O;
  selected: O;
  isCorrect: boolean;
  speech?: Array<SpeechSelect | SpeechFunnel | SpeechBase>;
  text?: string;
  image?: string;
  title?: string;
}
