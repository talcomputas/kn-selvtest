import { QuestionCode } from '@features/questions/interfaces/question-code.interface';
import { QuestionDialogue } from '@features/questions/interfaces/question-dialogue.interface';
import { QuestionHotspot } from '@features/questions/interfaces/question-hotspot.interface';
import { QuestionMultiple, QuestionMultipleDiffPoints } from '@features/questions/interfaces/question-multiple.interface';
import { QuestionRanking } from '@features/questions/interfaces/question-ranking.interface';
import { QuestionSingle } from '@features/questions/interfaces/question-single.interface';
import { QuestionSlider } from '@features/questions/interfaces/question-slider.interface';

export type QuestionsUnionType
  = QuestionCode
  | QuestionDialogue
  | QuestionHotspot
  | QuestionMultiple
  | QuestionMultipleDiffPoints
  | QuestionRanking
  | QuestionSingle
  | QuestionSlider;
