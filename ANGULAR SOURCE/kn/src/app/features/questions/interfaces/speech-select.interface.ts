import { SpeechBase } from '@features/questions/interfaces/speech-base.interface';

export interface SpeechSelect extends SpeechBase {
  options: string[];
}
