import { ModuleType } from '../enums/module-type.enum';
import { QuestionsUnionType } from '@features/questions/types/questions-union.type';

export interface Module {
  id: number;
  questions: QuestionsUnionType[];
  funnel: { type: ModuleType, baseScore: number };
}
