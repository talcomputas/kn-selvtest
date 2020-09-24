import { SpeechBase } from '@features/questions/interfaces/speech-base.interface';

export interface SpeechFunnel extends SpeechBase {
  next: string;
}
