import { SpeechType } from '@features/questions/enums/speech-type.enum';

export interface SpeechBase {
  id: string;
  type: SpeechType;
  person: string;
  text: string;
}
