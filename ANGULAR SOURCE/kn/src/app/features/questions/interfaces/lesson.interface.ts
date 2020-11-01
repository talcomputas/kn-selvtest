import { Intro } from '@features/questions/interfaces/intro.interface';
import { Module } from '@features/questions/interfaces/module.interface';
import { ResultLevels } from '@features/questions/interfaces/result-levels.interface';

export interface Lesson {
  intro: Intro;
  result: ResultLevels;
  modules: Module[];
}
