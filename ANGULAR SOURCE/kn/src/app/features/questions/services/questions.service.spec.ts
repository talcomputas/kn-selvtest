import { HttpClient } from '@angular/common/http';
import { TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { ContentParser } from '@content/services/content.parser';
import { ContentService } from '@content/services/content.service';
import { Lesson } from '@features/questions/interfaces/lesson.interface';
import { QuestionsService } from '@features/questions/services/questions.service';
import { StatisticsApiService } from '@features/questions/services/statistics-api.service';
import { StatisticsService } from '@features/questions/services/statistics.service';
import { QuestionsUnionType } from '@features/questions/types/questions-union.type';

import nbmuntligtestenRaw from '@i18n/bokmal.content.muntligtesten.json';
import nbdigitaltestenRaw from '@i18n/bokmal.content.digitaltesten.json';
import nbregnesjekkenRaw from '@i18n/bokmal.content.regnesjekken.json';
import nbsamletestenRaw from '@i18n/bokmal.content.samletesten.json';
import { Module } from '@features/questions/interfaces/module.interface';
import { QuestionSingle } from '@features/questions/interfaces/question-single.interface';
import { QuestionType } from '@features/questions/enums/question-type.enum';
import { ResultAnswer } from '@features/questions/interfaces/result-answer.interface';
import { QuestionMultiple } from '@features/questions/interfaces/question-multiple.interface';
import { QuestionGroupsChoice } from '@features/questions/interfaces/question-groups-choice.interface';

describe('QuestionService', () => {
  // let contentParser = ContentParser;
  let httpClientSpy: { get: jasmine.Spy };
  // let contentService: ContentService;
  beforeEach(() => {
    httpClientSpy = jasmine.createSpyObj('HttpClient', ['get']);
    TestBed.configureTestingModule({
      providers: [
        QuestionsService,
        ContentService,
        ContentParser,
        StatisticsApiService,
        StatisticsService,
        {
          provide: HttpClient,
          useValue: httpClientSpy,
        },
      ],
      imports: [RouterTestingModule.withRoutes([])],
    });
  });

  it('Test getMaxScore for muntligtesten', () => {
    const contentService = TestBed.inject(ContentService);
    const nbmuntligtesten: Lesson = nbmuntligtestenRaw as Lesson;
    contentService.set('nb', nbmuntligtesten);
    contentService.setCtx('nb');
    const questionsService = TestBed.inject(QuestionsService);

    const questions: QuestionsUnionType[] = [];
    const modules = [...contentService.get('modules')];
    modules.forEach((module: Module) => {
      module.questions.forEach((question: QuestionsUnionType) => {
        questions.push(question);
      });
    });

    expect(questionsService.getMaxScore(questions)).toBe(30);
  });

  it('Test getMaxScore for digitaltesten', () => {
    const contentService = TestBed.inject(ContentService);
    const nbdigitaltesten: Lesson = nbdigitaltestenRaw as Lesson;
    contentService.set('nb', nbdigitaltesten);
    contentService.setCtx('nb');
    const questionsService = TestBed.inject(QuestionsService);

    const questions: QuestionsUnionType[] = [];
    const modules = [...contentService.get('modules')];
    modules.forEach((module: Module) => {
      module.questions.forEach((question: QuestionsUnionType) => {
        questions.push(question);
      });
    });

    expect(questionsService.getMaxScore(questions)).toBe(52);
  });

  it('Test getMaxScore for regnesjekken', () => {
    const contentService = TestBed.inject(ContentService);
    const nbregnesjekken: Lesson = nbregnesjekkenRaw as Lesson;
    contentService.set('nb', nbregnesjekken);
    contentService.setCtx('nb');
    const questionsService = TestBed.inject(QuestionsService);

    const questions: QuestionsUnionType[] = [];
    const modules = [...contentService.get('modules')];
    modules.forEach((module: Module) => {
      module.questions.forEach((question: QuestionsUnionType) => {
        questions.push(question);
      });
    });

    expect(questionsService.getMaxScore(questions)).toEqual(68);
  });

  it('Test getMaxScore for samletesten', () => {
    const contentService = TestBed.inject(ContentService);
    const nbsamletesten: Lesson = nbsamletestenRaw as Lesson;
    contentService.set('nb', nbsamletesten);
    contentService.setCtx('nb');
    const questionsService = TestBed.inject(QuestionsService);

    const questions: QuestionsUnionType[] = [];
    const modules = [...contentService.get('modules')];
    modules.forEach((module: Module) => {
      module.questions.forEach((question: QuestionsUnionType) => {
        questions.push(question);
      });
    });

    expect(questionsService.getMaxScore(questions)).toEqual(12);
  });

  it('QuestionSingle getResult correct answers should report as correct', () => {
    const contentService = TestBed.inject(ContentService);
    const nbsamletesten: Lesson = nbsamletestenRaw as Lesson;
    contentService.set('nb', nbsamletesten);
    contentService.setCtx('nb');
    const questionsService = TestBed.inject(QuestionsService);

    const question: QuestionSingle = {
      id: 66,
      type: QuestionType.SINGLE,
      text: 'howdy',
      answer: {
        value: 44,
        points: 1,
      },
      options: [
        {
          id: 11,
          text: 'Internett',
        },
        {
          id: 22,
          text: 'Elektronikkbutikker',
        },
        {
          id: 33,
          text: 'App Store/Google Play',
        },
        {
          id: 44,
          text: 'youtube',
        },
      ],
    };

    const result = questionsService.getResultAnswer(question, 44);
    const expectedResult: any = {
      id: 66,
      type: 'single',
      text: 'howdy',
      correct: {
        id: 44,
        text: 'youtube',
      },
      selected: {
        id: 44,
        text: 'youtube',
      },
      isCorrect: true,
    };
    expect(result).toEqual(expectedResult);
  });

  it('QuestionSingle getResult incorrect answers should report as incorrect', () => {
    const contentService = TestBed.inject(ContentService);
    const nbsamletesten: Lesson = nbsamletestenRaw as Lesson;
    contentService.set('nb', nbsamletesten);
    contentService.setCtx('nb');
    const questionsService = TestBed.inject(QuestionsService);

    const question: QuestionSingle = {
      id: 66,
      type: QuestionType.SINGLE,
      text: 'howdy',
      answer: {
        value: 44,
        points: 1,
      },
      options: [
        {
          id: 11,
          text: 'Internett',
        },
        {
          id: 22,
          text: 'Elektronikkbutikker',
        },
        {
          id: 33,
          text: 'App Store/Google Play',
        },
        {
          id: 44,
          text: 'youtube',
        },
      ],
    };

    const result = questionsService.getResultAnswer(question, 22);
    const expectedResult: any = {
      id: 66,
      type: 'single',
      text: 'howdy',
      correct: {
        id: 44,
        text: 'youtube',
      },
      selected: {
        id: 22,
        text: 'Elektronikkbutikker',
      },
      isCorrect: false,
    };
    expect(result).toEqual(expectedResult);
  });

  it('QuestionMultiple getResult correct answers should report as correct', () => {
    const contentService = TestBed.inject(ContentService);
    const nbsamletesten: Lesson = nbsamletestenRaw as Lesson;
    contentService.set('nb', nbsamletesten);
    contentService.setCtx('nb');
    const questionsService = TestBed.inject(QuestionsService);

    const question: QuestionMultiple = {
      id: 8,
      type: QuestionType.MULTIPLE,
      text: 'foo',
      answer: {
        value: [11, 22],
        points: 1,
      },
      options: [
        {
          id: 11,
          text: 'a',
        },
        {
          id: 22,
          text: 'b',
        },
        {
          id: 33,
          text: 'c',
        },
      ],
    };

    const result = questionsService.getResultAnswer(question, [11, 22]);
    const expectedResult: any = {
      id: 8,
      type: QuestionType.MULTIPLE,
      text: 'foo',
      correct: [
        {
          id: 11,
          text: 'a',
        },
        {
          id: 22,
          text: 'b',
        },
      ],
      selected: [
        {
          id: 11,
          text: 'a',
        },
        {
          id: 22,
          text: 'b',
        },
      ],
      isCorrect: true,
    };
    expect(result).toEqual(expectedResult);
  });

  it('QuestionMultiple getResult incorrect answers should report as incorrect', () => {
    const contentService = TestBed.inject(ContentService);
    const nbsamletesten: Lesson = nbsamletestenRaw as Lesson;
    contentService.set('nb', nbsamletesten);
    contentService.setCtx('nb');
    const questionsService = TestBed.inject(QuestionsService);

    const question: QuestionMultiple = {
      id: 8,
      type: QuestionType.MULTIPLE,
      text: 'foo',
      answer: {
        value: [11, 22],
        points: 1,
      },
      options: [
        {
          id: 11,
          text: 'a',
        },
        {
          id: 22,
          text: 'b',
        },
        {
          id: 33,
          text: 'c2',
        },
      ],
    };

    const result = questionsService.getResultAnswer(question, [22, 33]);
    const expectedResult: any = {
      id: 8,
      type: QuestionType.MULTIPLE,
      text: 'foo',
      correct: [
        {
          id: 11,
          text: 'a',
        },
        {
          id: 22,
          text: 'b',
        },
      ],
      selected: [
        {
          id: 22,
          text: 'b',
        },
        {
          id: 33,
          text: 'c2',
        },
      ],
      isCorrect: false,
    };
    expect(result).toEqual(expectedResult);
  });

  it('QuestionGroupsChoice getResult correct answers should report as correct', () => {
    const contentService = TestBed.inject(ContentService);
    const nbsamletesten: Lesson = nbsamletestenRaw as Lesson;
    contentService.set('nb', nbsamletesten);
    contentService.setCtx('nb');
    const questionsService = TestBed.inject(QuestionsService);

    const question: QuestionGroupsChoice = {
      id: 10,
      type: QuestionType.GROUPS_CHOICE,
      title: 'Drømmen om en bondegård',
      text:
        'Henrik bladde fram til sidene med boligannonser. Leiligheten deres var %s for liten for dem, så nå lette de etter %s større. De ville gjerne flytte ut på landet. De lette etter en liten %s hvor det var plass til å ha et par %s.',
      options: [
        [
          {
            id: 1,
            text: 'innredet',
          },
          {
            id: 2,
            text: 'solgt',
          },
          {
            id: 3,
            text: 'annonsert',
          },
          {
            id: 4,
            text: 'blitt',
          },
        ],
        [
          {
            id: 1,
            text: 'det',
          },
          {
            id: 2,
            text: 'noe',
          },
          {
            id: 3,
            text: 'annet',
          },
          {
            id: 4,
            text: 'flere',
          },
        ],
        [
          {
            id: 1,
            text: 'altan',
          },
          {
            id: 2,
            text: 'restaurant',
          },
          {
            id: 3,
            text: 'gård',
          },
          {
            id: 4,
            text: 'bil',
          },
        ],
        [
          {
            id: 1,
            text: 'ferier',
          },
          {
            id: 2,
            text: 'hester',
          },
          {
            id: 3,
            text: 'år',
          },
          {
            id: 4,
            text: 'foredrag',
          },
        ],
      ],
      answer: {
        value: [4, 2, 3, 2],
        points: 1,
      },
    };
    const result = questionsService.getResultAnswer(question, [4, 2, 3, 2]);
    const expectedResult: any = {
      id: 10,
      type: QuestionType.GROUPS_CHOICE,
      text:
        'Henrik bladde fram til sidene med boligannonser. Leiligheten deres var %s for liten for dem, så nå lette de etter %s større. De ville gjerne flytte ut på landet. De lette etter en liten %s hvor det var plass til å ha et par %s.',
      correct: [
        {
          id: 4,
          text: 'blitt',
        },
        {
          id: 2,
          text: 'noe',
        },
        {
          id: 3,
          text: 'gård',
        },
        {
          id: 2,
          text: 'hester',
        },
      ],
      selected: [
        {
          id: 4,
          text: 'blitt',
        },
        {
          id: 2,
          text: 'noe',
        },
        {
          id: 3,
          text: 'gård',
        },
        {
          id: 2,
          text: 'hester',
        },
      ],
      isCorrect: true,
    };

    expect(result).toEqual(expectedResult);
  });

  it('QuestionGroupsChoice getResult incorrect answers should report as incorrect', () => {
    const contentService = TestBed.inject(ContentService);
    const nbsamletesten: Lesson = nbsamletestenRaw as Lesson;
    contentService.set('nb', nbsamletesten);
    contentService.setCtx('nb');
    const questionsService = TestBed.inject(QuestionsService);

    const question: QuestionGroupsChoice = {
      id: 10,
      type: QuestionType.GROUPS_CHOICE,
      title: 'Drømmen om en bondegård',
      text:
        'Henrik bladde fram til sidene med boligannonser. Leiligheten deres var %s for liten for dem, så nå lette de etter %s større. De ville gjerne flytte ut på landet. De lette etter en liten %s hvor det var plass til å ha et par %s.',
      options: [
        [
          {
            id: 1,
            text: 'innredet',
          },
          {
            id: 2,
            text: 'solgt',
          },
          {
            id: 3,
            text: 'annonsert',
          },
          {
            id: 4,
            text: 'blitt',
          },
        ],
        [
          {
            id: 1,
            text: 'det',
          },
          {
            id: 2,
            text: 'noe',
          },
          {
            id: 3,
            text: 'annet',
          },
          {
            id: 4,
            text: 'flere',
          },
        ],
        [
          {
            id: 1,
            text: 'altan',
          },
          {
            id: 2,
            text: 'restaurant',
          },
          {
            id: 3,
            text: 'gård',
          },
          {
            id: 4,
            text: 'bil',
          },
        ],
        [
          {
            id: 1,
            text: 'ferier',
          },
          {
            id: 2,
            text: 'hester',
          },
          {
            id: 3,
            text: 'år',
          },
          {
            id: 4,
            text: 'foredrag',
          },
        ],
      ],
      answer: {
        value: [4, 2, 3, 2],
        points: 1,
      },
    };
    const result = questionsService.getResultAnswer(question, [4, 4, 4, 4]);
    const expectedResult: any = {
      id: 10,
      type: QuestionType.GROUPS_CHOICE,
      text:
        'Henrik bladde fram til sidene med boligannonser. Leiligheten deres var %s for liten for dem, så nå lette de etter %s større. De ville gjerne flytte ut på landet. De lette etter en liten %s hvor det var plass til å ha et par %s.',
      correct: [
        {
          id: 4,
          text: 'blitt',
        },
        {
          id: 2,
          text: 'noe',
        },
        {
          id: 3,
          text: 'gård',
        },
        {
          id: 2,
          text: 'hester',
        },
      ],
      selected: [
        {
          id: 4,
          text: 'blitt',
        },
        {
          id: 4,
          text: 'flere',
        },
        {
          id: 4,
          text: 'bil',
        },
        {
          id: 4,
          text: 'foredrag',
        },
      ],
      isCorrect: false,
    };

    expect(result).toEqual(expectedResult);
  });
});
