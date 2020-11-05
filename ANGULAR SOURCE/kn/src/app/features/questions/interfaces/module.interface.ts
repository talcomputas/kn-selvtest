import { QuestionsUnionType } from '@features/questions/types/questions-union.type';
import { Funnel } from '@features/questions/interfaces/funnel.interface';

export interface Module {
  id: number;
  questions: QuestionsUnionType[];
  funnel: Funnel;
}
