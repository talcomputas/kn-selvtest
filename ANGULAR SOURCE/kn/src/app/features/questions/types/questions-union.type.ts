import { QuestionCode } from '@features/questions/interfaces/question-code.interface';
import { QuestionDialogue } from '@features/questions/interfaces/question-dialogue.interface';
import { QuestionGrading } from '@features/questions/interfaces/question-grading.interface';
import { QuestionGroupsChoice } from '@features/questions/interfaces/question-groups-choice.interface';
import { QuestionHotspot } from '@features/questions/interfaces/question-hotspot.interface';
import { QuestionMultipleDiffPoints } from '@features/questions/interfaces/question-multiple-diff-points.interface';
import { QuestionMultiple } from '@features/questions/interfaces/question-multiple.interface';
import { QuestionRanking } from '@features/questions/interfaces/question-ranking.interface';
import { QuestionSingle } from '@features/questions/interfaces/question-single.interface';
import { QuestionSlider } from '@features/questions/interfaces/question-slider.interface';

export type QuestionsUnionType =
  | QuestionCode
  | QuestionDialogue
  | QuestionHotspot
  | QuestionMultiple
  | QuestionMultipleDiffPoints
  | QuestionGroupsChoice
  | QuestionRanking
  | QuestionSingle
  | QuestionSlider
  | QuestionGrading;
