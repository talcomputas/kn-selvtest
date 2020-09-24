import { Level } from '@features/questions/interfaces/level.interface';
import { ResultAnswer } from '@features/questions/interfaces/result-answer.interface';

export interface Result {
  level: Level;
  score: number;
  maxScore: number;
  data: ResultAnswer[];
}
