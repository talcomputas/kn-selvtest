// import nbsamltetestenRaw from '@i18n/bokmal.content.samletesten.json';

import nbdigitaltestenRaw from '@i18n/bokmal.content.digitaltesten.json';
import nndigitaltestenRaw from '@i18n/nynorsk.content.digitaltesten.json';

import nblesetestenRaw from '@i18n/bokmal.content.lesetesten.json';
import nnlesetestenRaw from '@i18n/nynorsk.content.lesetesten.json';

import nbmuntligtestenRaw from '@i18n/bokmal.content.muntligtesten.json';
import nnmuntligtestenRaw from '@i18n/nynorsk.content.muntligtesten.json';

import nbregnesjekkenRaw from '@i18n/bokmal.content.regnesjekken.json';
import nnregnesjekkenRaw from '@i18n/nynorsk.content.regnesjekken.json';

import nbregnetestenRaw from '@i18n/bokmal.content.regnetesten.json';
import nnleseskrivesjekkenRaw from '@i18n/nynorsk.content.leseskrivesjekken.json';
/* import { Lesson } from '@features/questions/interfaces/lesson.interface';
import { QuestionSingle } from '@features/questions/interfaces/question-single.interface';
import { QuestionCode } from '@features/questions/interfaces/question-code.interface';
import { QuestionDialogue } from '@features/questions/interfaces/question-dialogue.interface';
import { QuestionGroupsChoice } from '@features/questions/interfaces/question-groups-choice.interface';
import { QuestionHotspot } from '@features/questions/interfaces/question-hotspot.interface';
import { QuestionMultipleDiffPoints } from '@features/questions/interfaces/question-multiple-diff-points.interface';
import { QuestionMultiple } from '@features/questions/interfaces/question-multiple.interface';
import { QuestionRanking } from '@features/questions/interfaces/question-ranking.interface';
import { QuestionSlider } from '@features/questions/interfaces/question-slider.interface'; */

enum ModuleType {
  BASE = 'BASE',
  ADVANCED = 'ADVANCED',
}

type QuestionsUnionType =
  | QuestionCode
  | QuestionDialogue
  | QuestionHotspot
  | QuestionMultiple
  | QuestionMultipleDiffPoints
  | QuestionGroupsChoice
  | QuestionRanking
  | QuestionSingle
  | QuestionSlider;

interface SpeechFunnel extends SpeechBase {
  next: string;
}

interface SpeechSelect extends SpeechBase {
  options: string[];
}

enum SpeechType {
  INTRO = 'intro',
  EXAMPLE = 'example',
  OPTION = 'option',
  QUESTION = 'question',
  COMPLETION = 'completion',
}

interface SpeechBase {
  id: string;
  type: SpeechType;
  person: string;
  text: string;
}

interface SliderOption extends Option {
  floor: number;
  ceil: number;
}

enum OptionSize {
  XL = 'xl',
  L = 'l',
  M = 'm',
  S = 's',
  XS = 'xs',
}

interface Options extends Array<Option[]> {}

interface Intro {
  label: string;
  title: string;
  text: string;
  image: string;
}

interface PossibleLevel {
  id: string;
  title: string;
  text: string;
  minScore: number;
}

interface PossibleLevels {
  image: string;
  levels: {
    [index: number]: PossibleLevel;
  };
}

interface Lesson {
  intro: Intro;
  result: PossibleLevels;
  modules: Module[];
}

interface Funnel {
  baseScore: number;
  type: ModuleType;
}

interface Answer<V = any, P = any> {
  value: V;
  points: P;
}

enum QuestionType {
  SINGLE = 'single',
  MULTIPLE = 'multiple',
  MULTIPLE_DIFF_POINTS = 'multiple-diff-points',
  CODE = 'code',
  HOTSPOT = 'hotspot',
  RANKING = 'ranking',
  DIALOGUE = 'dialogue',
  SLIDER = 'slider',
  GROUPS_CHOICE = 'groups-choice',
}

interface Transition {
  title: string;
  text: string;
}

interface QuestionBase<T = Answer> {
  id: number;
  type: QuestionType;
  answer: T;
  transition?: Transition;
  audio?: string;
  image?: string;
  video?: { url: string; autoplay: boolean; controls: boolean; loop: boolean };
}

interface AnswerWithMultiplePoints {
  value: number[];
  points: number[];
}

interface QuestionInfo {
  title: string;
  text: string;
}

interface Option {
  id: number;
  text?: string;
  audio?: string;
  image?: string;
  video?: string;
}

interface Module {
  id: number;
  questions: QuestionsUnionType[];
  funnel: Funnel;
}

interface QuestionSingle extends QuestionBase {
  text: string;
  answer: Answer<number, number>;
  options: Option[];
  optionSize?: OptionSize;
  title?: string;
  info?: QuestionInfo;
}

interface QuestionMultipleDiffPoints extends QuestionBase {
  text: string;
  answer: Answer<number[], number[]>;
  options: Option[];
  title?: string;
  info?: QuestionInfo;
}

interface QuestionGroupsChoice extends QuestionBase {
  title?: string;
  text: string;
  options: Options;
  answer: Answer<number[], number>;
}

interface QuestionMultiple extends QuestionBase {
  text: string;
  answer: Answer<number[], number>;
  options: Option[];
  title?: string;
  info?: QuestionInfo;
}

interface QuestionHotspot extends QuestionBase {
  text: string;
  image: string;
  answer: Answer<number, number>;
  options: { id: number; x: number; y: number; width: number; height: number }[];
  info?: QuestionInfo;
  title?: string;
}

interface QuestionDialogue extends QuestionBase {
  speech: Array<SpeechSelect | SpeechFunnel | SpeechBase>;
  answer: Answer<string[], number>;
}

interface QuestionCode extends QuestionBase {
  text: string;
  answer: Answer<number, number>;
  title?: string;
  info?: QuestionInfo;
}

interface QuestionRanking extends QuestionBase {
  text: string;
  options: Option[];
  answer: Answer<number[], number>;
  title?: string;
  info?: QuestionInfo;
}

interface QuestionSlider extends QuestionBase {
  text: string;
  answer: Answer<number, number>;
  options: SliderOption;
  optionSize?: OptionSize;
  title?: string;
  info?: QuestionInfo;
  calculator?: boolean;
}

const nbSamleSjekken: Lesson = nbsamltetestenRaw as Lesson;
const nbdigitaltesten: Lesson = nbdigitaltestenRaw as Lesson;
const nndigitaltesten: Lesson = nndigitaltestenRaw as Lesson;
const nblesetesten: Lesson = nblesetestenRaw as Lesson;
const nnlesetesten: Lesson = nnlesetestenRaw as Lesson;
const nbmuntligtesten: Lesson = nbmuntligtestenRaw as Lesson;
const nnmuntligtesten: Lesson = nnmuntligtestenRaw as Lesson;
const nbregnesjekken: Lesson = nbregnesjekkenRaw as Lesson;
const nnregnesjekken: Lesson = nnregnesjekkenRaw as Lesson;
const nbregnetesten: Lesson = nbregnetestenRaw as Lesson;
const nnleseskrivesjekken: Lesson = nbsamltetestenRaw as Lesson;

const q1 = nbSamleSjekken.modules[0].questions[0] as QuestionSingle;
const p11 = q1.answer.value;
const p111 = q1.answer.points;

const q2 = nbSamleSjekken.modules[0].questions[1] as QuestionMultiple;
const p22 = q2.answer.points;
const p222 = q2.answer.value;

const q3 = nbSamleSjekken.modules[0].questions[2] as QuestionHotspot;
const p33 = q3.answer.points;
const p333 = q3.answer.value;

const q4 = nbSamleSjekken.modules[0].questions[3] as QuestionDialogue;
const p44 = q4.answer.points;
const p444 = q4.answer.value;

const q5 = nbSamleSjekken.modules[0].questions[4] as QuestionCode;
const p55 = q5.answer.points;
const p555 = q5.answer.value;

const q6 = nbSamleSjekken.modules[0].questions[5] as QuestionRanking;
const p66 = q6.answer.points;
const p666 = q6.answer.value;

const q7 = nbSamleSjekken.modules[0].questions[6] as QuestionSlider;
const p77 = q7.answer.points;
const p777 = q7.answer.value;

const q8 = nbSamleSjekken.modules[0].questions[7] as QuestionMultipleDiffPoints;
const p88 = q8.answer.points;
const p888 = q8.answer.value;

const q9 = nbSamleSjekken.modules[0].questions[8] as QuestionGroupsChoice;
const p99 = q9.answer.points;
const p999 = q9.answer.value;

console.log('check');
