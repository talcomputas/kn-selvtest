import { QuestionBase } from '../interfaces/question-base.interface';
import { SpeechBase } from '@features/questions/interfaces/speech-base.interface';
import { Answer } from '@features/questions/interfaces/answer.interface';

export interface QuestionDialogue extends QuestionBase {
  speech: SpeechBase[];
  answer: Answer<string[]>;
}
