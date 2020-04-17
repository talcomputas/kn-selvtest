import { Router } from '@angular/router';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, Subscription } from 'rxjs';
import { ContentService } from '@content/services/content.service';
import { ModuleType } from '../enums/module-type.enum';
import { QuestionType } from '../enums/question-type.enum';
import { Module } from '../interfaces/module.interface';
import { QuestionSingle } from '../interfaces/question-single.interface';
import { QuestionHotspot } from '@features/questions/interfaces/question-hotspot.interface';
import { QuestionRanking } from '@features/questions/interfaces/question-ranking.interface';
import { QuestionCode } from '@features/questions/interfaces/question-code.interface';
import { QuestionMultiple } from '@features/questions/interfaces/question-multiple.interface';
import { QuestionDialogue } from '@features/questions/interfaces/question-dialogue.interface';
import { QuestionsUnionType } from '@features/questions/types/questions-union.type';
import { Level } from '@features/questions/interfaces/level.interface';
import { compareCodes, compareMultiple, compareSingle } from '@features/questions/utils/comparison.utils';
import { ResultAnswer } from '@features/questions/interfaces/result-answer.interface';
import { SpeechType } from '@features/questions/enums/speech-type.enum';
import { SpeechBase } from '@features/questions/interfaces/speech-base.interface';
import { SpeechFunnel } from '@features/questions/interfaces/speech-funnel.interface';
import { SpeechSelect } from '@features/questions/interfaces/speech-select.interface';
import { Result } from '@features/questions/interfaces/result.interface';
import { StatisticsService } from '@features/questions/services/statistics.service';

@Injectable()
export class QuestionsService {
  private readonly currentQuestion$ = new BehaviorSubject<QuestionsUnionType>(null);
  private readonly currentLength$ = new BehaviorSubject<number>(0);

  private readonly questionsDictionary = new Map<number, QuestionsUnionType>();
  private readonly levelsDictionary = new Map<string, Level>();

  private levels: Level[];
  private modules: Module[];
  private questions: QuestionsUnionType[] = [];
  private answers: { [key: string]: any };
  private index: number;
  private prevent: boolean;

  private contentChangesSubscription: Subscription;

  constructor(private router: Router,
              private content: ContentService,
              private statisticsService: StatisticsService) {
    this.index = 0;
    this.initContent();
  }

  get changes$(): Observable<void> {
    return this.content.changes;
  }

  get question$(): Observable<QuestionsUnionType> {
    return this.currentQuestion$.asObservable();
  }

  get length$(): Observable<number> {
    return this.currentLength$.asObservable();
  }

  update(index: number, answers: { [key: string]: any }): void {
    this.answers = answers;
    this.initQuestions(answers);

    if (isNaN(index) || index === null) {
      this.handleStatistics(this.index, index);
      this.index = 0;
      return;
    }

    this.currentQuestion$.next(this.questions[index]);
    this.handleQuestionState(this.index, index);

    if (this.prevent) {
      return;
    }

    this.handleStatistics(this.index, index);
    this.index = index;
  }

  result(): Result {
    if (!this.answers || !this.questions) {
      this.router.navigateByUrl('/');
      return null;
    }

    const answers = this.selectAnswers(this.answers, this.questions);
    const correctAnswers = this.selectCorrectAnswers(this.questions);
    const maxScore = this.getMaxScore(this.questions);
    const score = this.getScore(answers);
    const data = Object.keys(correctAnswers).reduce((acc, questionId) => [...acc, this.getResultAnswer(this.getQuestion(+questionId))], []);
    const level = this.levels.sort((a: Level, b: Level) => b.minScore - a.minScore).find((l: Level) => score >= l.minScore);
    return { level, score, maxScore, data };
  }

  attach(): void {
    this.contentChangesSubscription = this.content.changes.subscribe(() => this.initContent());
  }

  detach(): void {
    if (this.contentChangesSubscription) {
      this.contentChangesSubscription.unsubscribe();
    }
  }

  private initContent(): void {
    this.initLevelsDictionary();
    this.initQuestionsDictionary();
    this.initQuestions(this.answers);

    if (!isNaN(this.index)) {
      this.currentQuestion$.next(this.questions[this.index]);
    }
  }

  private initQuestionsDictionary(): void {
    this.modules = [...this.content.get('modules')];
    this.modules.forEach((module: Module) =>
      module.questions.forEach((question: QuestionsUnionType) => this.questionsDictionary.set(question.id, question)));
  }

  private initLevelsDictionary(): void {
    const levels = this.content.get('result.levels') || {};
    this.levels = [...Object.values(levels) as Level[]];
    Object.keys(levels).forEach((key: string) => this.levelsDictionary.set(key, levels[key]));
  }

  private initQuestions(answers?: { [key: string]: any }) {
    const baseQuestions = this.modules
      .filter((module: Module) => module.funnel.type === ModuleType.BASE)
      .reduce((acc: QuestionsUnionType[], module: Module) => [...acc, ...module.questions], []);

    let baseQuestionsScore = 0;

    if (answers) {
      const baseAnswers = this.selectAnswers(answers, baseQuestions);
      baseQuestionsScore = this.getScore(baseAnswers);
    }

    const advancedModule = this.modules
      .filter((module: Module) => module.funnel.type === ModuleType.ADVANCED)
      .sort((a: Module, b: Module) => b.funnel.baseScore - a.funnel.baseScore)
      .find((module: Module) => baseQuestionsScore >= module.funnel.baseScore);

    const advancedQuestion = advancedModule && advancedModule.questions || [];

    this.questions = [...baseQuestions, ...advancedQuestion];

    // remove
    // this.questions = [this.modules.reduce((acc: QuestionsUnionType[], module: Module) => [...acc, ...module.questions], [])[7]];
    // remove end

    this.currentLength$.next(this.questions.length);
  }

  private handleQuestionState(prevIndex: number, currIndex: number): void {
    const prevQuestion = this.questions[prevIndex];

    if (currIndex !== 0 && !this.answers.hasOwnProperty(prevQuestion && prevQuestion.id)) {
      this.prevent = true;
      this.router.navigateByUrl('/');
      return;
    }

    this.prevent = false;
  }

  private selectAnswers(answers: { [key: string]: any }, questions: QuestionsUnionType[]): { [key: string]: any } {
    if (!answers || !questions) {
      return {};
    }

    return questions.reduce((acc, item) => {
      const { id } = item;
      const value = answers[id];
      const answer = value !== undefined ? { [id]: value } : {};
      return { ...acc, ...answer };
    }, {});
  }

  private getQuestion(id: number): QuestionsUnionType {
    return this.questionsDictionary.get(id);
  }

  private getScore(answers: { [key: string]: any }): number {
    let score = 0;

    Object.keys(answers).forEach((id: string) => {
      const questionId = Number(id);
      const selection = answers[id];
      const question = this.questionsDictionary.get(questionId);

      if (!questionId || !selection || !question) {
        return score;
      }

      switch (question.type) {
        case QuestionType.SINGLE: {
          const { answer } = question as QuestionSingle;
          score += this.singleChoicePoints<number>(answer, selection);
          break;
        }

        case QuestionType.HOTSPOT: {
          const { answer } = question as QuestionHotspot;
          score += this.singleChoicePoints<number>(answer, selection);
          break;
        }

        case QuestionType.RANKING: {
          const { answer } = question as QuestionRanking;
          score += this.multipleChoicePoints<number>(answer, selection, false);
          break;
        }

        case QuestionType.CODE: {
          const { answer } = question as QuestionCode;
          score += this.codePoints(answer, selection);
          break;
        }

        case QuestionType.MULTIPLE: {
          const { answer } = question as QuestionMultiple;
          score += this.multipleChoicePoints<number>(answer, selection);
          break;
        }

        case QuestionType.DIALOGUE: {
          const { answer } = question as QuestionDialogue;
          score += this.multipleChoicePoints<string>(answer, selection, false);
          break;
        }
      }
    });

    return score;
  }

  private getResultAnswer(question: QuestionsUnionType): ResultAnswer {
    const selectOption = (value: any, options: { id: any }[]) => options.find(option => option.id === value);
    const dialogueAnswer = (speech: (SpeechBase & SpeechFunnel & SpeechSelect)[], selection: string[]) => {
      const data = [];

      speech.forEach(() => {
        const lastItem = data[data.length - 1];

        if (!lastItem) {
          const firstQuestion = speech.find(q => q.options && q.options.includes(selection[0]));
          data.push(firstQuestion);
          return;
        }

        const { type: lastItemType } = lastItem;

        if (lastItemType === SpeechType.OPTION) {
          const nextItem = speech.find(s => s.id === lastItem.next && lastItem.next);
          if (nextItem) {
            data.push(nextItem);
          }
          return;
        }

        if (lastItemType === SpeechType.QUESTION) {
          const selectedId = lastItem.options.find(o => selection.includes(o));
          if (!selectedId) {
            return;
          }

          const option = speech.find(s => s.id === selectedId);

          if (option) {
            data.push(option);
          }
        }
      });

      return data;
    };

    const { id, answer, type } = question;
    const selectedValue = this.answers[String(id)];

    switch (type) {
      case QuestionType.SINGLE: {
        const { text, options } = question as QuestionSingle;
        const correct = selectOption(answer.value, options);
        const selected = selectOption(selectedValue, options);
        const isCorrect = compareSingle(selectedValue, answer.value);
        return { id, type, text, correct, selected, isCorrect };
      }

      case QuestionType.CODE: {
        const { text } = question as QuestionCode;
        const correct = answer.value;
        const selected = Number(selectedValue);
        const isCorrect = compareCodes(selectedValue, answer.value);
        return { id, type, text, correct, selected, isCorrect };
      }

      case QuestionType.HOTSPOT: {
        const { text, options, image } = question as QuestionHotspot;
        const correct = selectOption(answer.value, options);
        const selected = selectOption(selectedValue, options);
        const isCorrect = compareSingle(selectedValue, answer.value);
        return { id, type, text, correct, selected, isCorrect, image };
      }

      case QuestionType.MULTIPLE: {
        const { text, options } = question as QuestionMultiple;
        const values = answer.value as number[];
        const correct = values.map(v => selectOption(v, options));
        const selected = selectedValue.map(v => selectOption(v, options));
        const isCorrect = compareMultiple(selectedValue, values);
        return { id, type, text, correct, selected, isCorrect };
      }

      case QuestionType.DIALOGUE: {
        const { speech } = question as QuestionDialogue;
        const values = answer.value as string[];
        const isCorrect = compareMultiple(selectedValue, values, false);
        const correct = dialogueAnswer(speech as (SpeechBase & SpeechFunnel & SpeechSelect)[], values);
        const selected = dialogueAnswer(speech as (SpeechBase & SpeechFunnel & SpeechSelect)[], selectedValue);
        return { id, type, speech, correct, selected, isCorrect };
      }

      case QuestionType.RANKING: {
        const { text, options } = question as QuestionRanking;
        const values = answer.value as number[];
        const correct = values.map(v => selectOption(v, options));
        const selected = selectedValue.map(v => selectOption(v, options));
        const isCorrect = compareMultiple(selectedValue, values, false);
        return { id, type, text, correct, selected, isCorrect };
      }
    }
  }

  private handleStatistics(prevIndex: number, currIndex: number): void {
    if (prevIndex !== null && currIndex !== null && prevIndex > currIndex) {
      return;
    }

    if (prevIndex === 0 && currIndex === 0) {
      this.statisticsService.setTestStart();
    }

    const prevQuestion = this.questions[prevIndex];
    const currQuestion = this.questions[currIndex];

    if (!prevQuestion) {
      return;
    }

    if (this.answers.hasOwnProperty(prevQuestion.id)) {
      const userAnswer = this.answers[prevQuestion.id];
      const correctAnswer = this.getCorrectAnswerValue(prevQuestion.id);
      const isCorrect = this.isCorrectAnswer(prevQuestion.id, userAnswer);
      this.statisticsService.setQuestion(userAnswer, correctAnswer, isCorrect);
    }

    if (currQuestion) {
      this.statisticsService.initQuestion(currQuestion.id);
    }
  }

  private getCorrectAnswerValue(questionId: number): number | number[] | string | string[] {
    const question: QuestionsUnionType = this.questionsDictionary.get(questionId);
    return question && question.answer && question.answer.value;
  }

  private isCorrectAnswer(questionId: number, selectedValue: any): boolean {
    const question: QuestionsUnionType = this.questionsDictionary.get(questionId);

    if (!question) {
      return false;
    }

    const { type, answer } = question;

    if (!type || !answer) {
      return false;
    }

    const { value: correctValue } = answer;

    switch (type) {
      case QuestionType.HOTSPOT:
      case QuestionType.SINGLE: {
        return compareSingle(selectedValue, correctValue as number);
      }

      case QuestionType.CODE: {
        return compareCodes(selectedValue, correctValue as number);
      }

      case QuestionType.MULTIPLE: {
        return compareMultiple(selectedValue, correctValue as number[]);
      }

      case QuestionType.DIALOGUE: {
        return compareMultiple(selectedValue, correctValue as string[], false);
      }

      case QuestionType.RANKING: {
        return compareMultiple(selectedValue, correctValue as number[], false);
      }
    }
  }

  private selectCorrectAnswers(questions: QuestionsUnionType[]): { [key: string]: any } {
    return questions.reduce((acc, item) => ({ ...acc, ...{ [item.id]: item.answer.value } }), {});
  }

  private getMaxScore(questions: QuestionsUnionType[]): number {
    return questions.reduce((acc, item) => acc += item && item.answer && item.answer.points || 0, 0);
  }

  private codePoints(answer: { points: number, value: number }, code: string): number {
    if (!answer) {
      return 0;
    }

    const isCorrect = compareCodes(code, answer.value);
    return isCorrect && answer.points || 0;
  }

  private singleChoicePoints<T>(answer: { points: number, value: T }, selection: T): number {
    if (!answer) {
      return 0;
    }

    const isCorrect = compareSingle(selection, answer.value);
    return isCorrect && answer.points || 0;
  }

  private multipleChoicePoints<T>(answer: { points: number, value: T[] }, selection: T[], sorting = true): number {
    if (!answer) {
      return 0;
    }

    const isCorrect = compareMultiple(answer.value, selection, sorting);

    return isCorrect && answer.points || 0;
  }
}
