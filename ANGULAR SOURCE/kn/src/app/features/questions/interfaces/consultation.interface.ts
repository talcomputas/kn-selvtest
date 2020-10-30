import { Intro } from '@features/questions/interfaces/intro.interface';
import { Module } from '@features/questions/interfaces/module.interface';
import { PossibleLevels } from '@features/questions/interfaces/possible-levels';

export interface Consultation {
  intro: Intro;
  result: PossibleLevels;
  modules: Module[];
}
