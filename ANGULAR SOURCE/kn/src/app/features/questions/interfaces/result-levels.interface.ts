import { ResultLevel } from '@features/questions/interfaces/result-level.interface';

export interface ResultLevels {
  image: string;
  levels: {
    [index: number]: ResultLevel;
  };
}
