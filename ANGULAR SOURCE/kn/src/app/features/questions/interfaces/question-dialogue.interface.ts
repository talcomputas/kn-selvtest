import { QuestionBase } from '../interfaces/question-base.interface';
import { SpeechBase } from '@features/questions/interfaces/speech-base.interface';
import { Answer } from '@features/questions/interfaces/answer.interface';
import { SpeechFunnel } from '@features/questions/interfaces/speech-funnel.interface';
import { SpeechSelect } from '@features/questions/interfaces/speech-select.interface';

export interface QuestionDialogue extends QuestionBase {
  speech: Array<SpeechSelect | SpeechFunnel | SpeechBase>;
  answer: Answer<string[]>;
}
