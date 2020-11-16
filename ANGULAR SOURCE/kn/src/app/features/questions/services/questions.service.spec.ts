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
import { QuestionCode } from '@features/questions/interfaces/question-code.interface';
import { QuestionDialogue } from '@features/questions/interfaces/question-dialogue.interface';
import { SpeechType } from '@features/questions/enums/speech-type.enum';

describe('QuestionService', () => {
  let httpClientSpy: { get: jasmine.Spy };
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

    expect(questionsService.getMaxScore(questions)).toEqual(8);
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

  it('QuestionCode getResult connect answers should report as connect', () => {
    const contentService = TestBed.inject(ContentService);
    const nbsamletesten: Lesson = nbsamletestenRaw as Lesson;
    contentService.set('nb', nbsamletesten);
    contentService.setCtx('nb');
    const questionsService = TestBed.inject(QuestionsService);
    const question: QuestionCode = {
      id: 7,
      text: 'foo',
      type: QuestionType.CODE,
      answer: {
        value: 2,
        points: 10,
      },
    };
    const result: ResultAnswer = questionsService.getResultAnswer(question, 2);
    expect(result).toEqual({
      id: 7,
      type: QuestionType.CODE,
      correct: 2,
      selected: 2,
      isCorrect: true,
      text: 'foo',
    });
  });

  it('QuestionCode getResult inconnect answers should report as inconnect', () => {
    const contentService = TestBed.inject(ContentService);
    const nbsamletesten: Lesson = nbsamletestenRaw as Lesson;
    contentService.set('nb', nbsamletesten);
    contentService.setCtx('nb');
    const questionsService = TestBed.inject(QuestionsService);
    const question: QuestionCode = {
      id: 7,
      text: 'foo',
      type: QuestionType.CODE,
      answer: {
        value: 2,
        points: 10,
      },
    };
    const result: ResultAnswer = questionsService.getResultAnswer(question, 5);
    expect(result).toEqual({
      id: 7,
      type: QuestionType.CODE,
      correct: 2,
      selected: 5,
      isCorrect: false,
      text: 'foo',
    });
  });

  it('QuestionDialogue getResult connect answers should report as connect', () => {
    const contentService = TestBed.inject(ContentService);
    const nbsamletesten: Lesson = nbsamletestenRaw as Lesson;
    contentService.set('nb', nbsamletesten);
    contentService.setCtx('nb');
    const questionsService = TestBed.inject(QuestionsService);
    const question: QuestionDialogue = {
      id: 3,
      type: QuestionType.DIALOGUE,
      answer: {
        value: ['D17F5', 'D17F10'],
        points: 10,
      },
      speech: [
        {
          id: 'D17F2',
          person: 'Sebastian',
          text:
            'Du skal hjelpe vennen din med å lage en Instagram-profil, så han kan delta på sosiale medier.',
          type: SpeechType.INTRO,
          next: 'D17F1',
        },
        {
          id: 'D17F1',
          person: 'Sebastian',
          text: 'Hei, jeg skal opprette en Instagram-profil. Hva slags passord er det best å ha?',
          type: SpeechType.QUESTION,
          options: ['D17F3', 'D17F4', 'D17F5'],
        },
        {
          id: 'D17F3',
          person: 'Player',
          text: 'Et som består av flere tilfeldige tall og bokstaver.',
          type: SpeechType.OPTION,
          next: 'D17F8',
        },
        {
          id: 'D17F4',
          person: 'Player',
          text: 'Et som består av forskjellige tegn og tall.',
          type: SpeechType.OPTION,
          next: 'D17F8',
        },
        {
          id: 'D17F5',
          person: 'Player',
          text: 'Et som består av forskjellige ord etter hverandre med sammenheng.',
          type: SpeechType.OPTION,
          next: 'D17F6',
        },
        {
          id: 'D17F8',
          person: 'Sebastian',
          text:
            'Det er ikke det jeg har hørt, men du vet når det står "husk meg". Når burde man IKKE bruke det?',
          type: SpeechType.QUESTION,
          options: ['D17F10', 'D17F11', 'D17F12'],
        },
        {
          id: 'D17F6',
          person: 'Sebastian',
          text:
            'Wow, det visste jeg ikke! Her står det også at jeg kan trykke på "husk meg". Når burde man IKKE bruke det?',
          type: SpeechType.QUESTION,
          options: ['D17F10', 'D17F11', 'D17F12'],
        },
        {
          id: 'D17F10',
          person: 'Player',
          text: 'Hvis flere bruker samme enhet.',
          type: SpeechType.OPTION,
          next: 'D17F13',
        },
        {
          id: 'D17F11',
          person: 'Player',
          text: 'Når man har dårlig tid.',
          type: SpeechType.OPTION,
          next: 'D17F17',
        },
        {
          id: 'D17F12',
          person: 'Player',
          text: 'Om man lett glemmer passord.',
          type: SpeechType.OPTION,
          next: 'D17F17',
        },
        {
          id: 'D17F13',
          person: 'Sebastian',
          text: 'Skjønner. Kan du hjelpe meg med å opprette en profil på Instagram?',
          type: SpeechType.COMPLETION,
        },
        {
          id: 'D17F17',
          person: 'Sebastian',
          text:
            'Det høres ikke logisk ut, men greit. Kan du hjelpe meg med å opprette en profil på Instagram?',
          type: SpeechType.COMPLETION,
        },
      ],
    };

    const result: ResultAnswer = questionsService.getResultAnswer(question, ['D17F5', 'D17F10']);
    expect(result).toEqual({
      id: 3,
      type: QuestionType.DIALOGUE,
      speech: [
        {
          id: 'D17F2',
          person: 'Sebastian',
          text:
            'Du skal hjelpe vennen din med å lage en Instagram-profil, så han kan delta på sosiale medier.',
          type: SpeechType.INTRO,
          next: 'D17F1',
        },
        {
          id: 'D17F1',
          person: 'Sebastian',
          text: 'Hei, jeg skal opprette en Instagram-profil. Hva slags passord er det best å ha?',
          type: SpeechType.QUESTION,
          options: ['D17F3', 'D17F4', 'D17F5'],
        },
        {
          id: 'D17F3',
          person: 'Player',
          text: 'Et som består av flere tilfeldige tall og bokstaver.',
          type: SpeechType.OPTION,
          next: 'D17F8',
        },
        {
          id: 'D17F4',
          person: 'Player',
          text: 'Et som består av forskjellige tegn og tall.',
          type: SpeechType.OPTION,
          next: 'D17F8',
        },
        {
          id: 'D17F5',
          person: 'Player',
          text: 'Et som består av forskjellige ord etter hverandre med sammenheng.',
          type: SpeechType.OPTION,
          next: 'D17F6',
        },
        {
          id: 'D17F8',
          person: 'Sebastian',
          text:
            'Det er ikke det jeg har hørt, men du vet når det står "husk meg". Når burde man IKKE bruke det?',
          type: SpeechType.QUESTION,
          options: ['D17F10', 'D17F11', 'D17F12'],
        },
        {
          id: 'D17F6',
          person: 'Sebastian',
          text:
            'Wow, det visste jeg ikke! Her står det også at jeg kan trykke på "husk meg". Når burde man IKKE bruke det?',
          type: SpeechType.QUESTION,
          options: ['D17F10', 'D17F11', 'D17F12'],
        },
        {
          id: 'D17F10',
          person: 'Player',
          text: 'Hvis flere bruker samme enhet.',
          type: SpeechType.OPTION,
          next: 'D17F13',
        },
        {
          id: 'D17F11',
          person: 'Player',
          text: 'Når man har dårlig tid.',
          type: SpeechType.OPTION,
          next: 'D17F17',
        },
        {
          id: 'D17F12',
          person: 'Player',
          text: 'Om man lett glemmer passord.',
          type: SpeechType.OPTION,
          next: 'D17F17',
        },
        {
          id: 'D17F13',
          person: 'Sebastian',
          text: 'Skjønner. Kan du hjelpe meg med å opprette en profil på Instagram?',
          type: SpeechType.COMPLETION,
        },
        {
          id: 'D17F17',
          person: 'Sebastian',
          text:
            'Det høres ikke logisk ut, men greit. Kan du hjelpe meg med å opprette en profil på Instagram?',
          type: SpeechType.COMPLETION,
        },
      ],
      selected: [
        {
          id: 'D17F1',
          person: 'Sebastian',
          text: 'Hei, jeg skal opprette en Instagram-profil. Hva slags passord er det best å ha?',
          type: 'question',
          options: ['D17F3', 'D17F4', 'D17F5'],
        },
        {
          id: 'D17F5',
          person: 'Player',
          text: 'Et som består av forskjellige ord etter hverandre med sammenheng.',
          type: 'option',
          next: 'D17F6',
        },
        {
          id: 'D17F6',
          person: 'Sebastian',
          text:
            'Wow, det visste jeg ikke! Her står det også at jeg kan trykke på "husk meg". Når burde man IKKE bruke det?',
          type: 'question',
          options: ['D17F10', 'D17F11', 'D17F12'],
        },
        {
          id: 'D17F10',
          person: 'Player',
          text: 'Hvis flere bruker samme enhet.',
          type: 'option',
          next: 'D17F13',
        },
        {
          id: 'D17F13',
          person: 'Sebastian',
          text: 'Skjønner. Kan du hjelpe meg med å opprette en profil på Instagram?',
          type: 'completion',
        },
      ],
      correct: [
        {
          id: 'D17F1',
          person: 'Sebastian',
          text: 'Hei, jeg skal opprette en Instagram-profil. Hva slags passord er det best å ha?',
          type: 'question',
          options: ['D17F3', 'D17F4', 'D17F5'],
        },
        {
          id: 'D17F5',
          person: 'Player',
          text: 'Et som består av forskjellige ord etter hverandre med sammenheng.',
          type: 'option',
          next: 'D17F6',
        },
        {
          id: 'D17F6',
          person: 'Sebastian',
          text:
            'Wow, det visste jeg ikke! Her står det også at jeg kan trykke på "husk meg". Når burde man IKKE bruke det?',
          type: 'question',
          options: ['D17F10', 'D17F11', 'D17F12'],
        },
        {
          id: 'D17F10',
          person: 'Player',
          text: 'Hvis flere bruker samme enhet.',
          type: 'option',
          next: 'D17F13',
        },
        {
          id: 'D17F13',
          person: 'Sebastian',
          text: 'Skjønner. Kan du hjelpe meg med å opprette en profil på Instagram?',
          type: 'completion',
        },
      ],
      isCorrect: true,
    });
  });

  it('QuestionDialogue getResult inconnect answers should report as inconnect', () => {
    const contentService = TestBed.inject(ContentService);
    const nbsamletesten: Lesson = nbsamletestenRaw as Lesson;
    contentService.set('nb', nbsamletesten);
    contentService.setCtx('nb');
    const questionsService = TestBed.inject(QuestionsService);
    const question: QuestionDialogue = {
      id: 3,
      type: QuestionType.DIALOGUE,
      answer: {
        value: ['D17F5', 'D17F10'],
        points: 10,
      },
      speech: [
        {
          id: 'D17F2',
          person: 'Sebastian',
          text:
            'Du skal hjelpe vennen din med å lage en Instagram-profil, så han kan delta på sosiale medier.',
          type: SpeechType.INTRO,
          next: 'D17F1',
        },
        {
          id: 'D17F1',
          person: 'Sebastian',
          text: 'Hei, jeg skal opprette en Instagram-profil. Hva slags passord er det best å ha?',
          type: SpeechType.QUESTION,
          options: ['D17F3', 'D17F4', 'D17F5'],
        },
        {
          id: 'D17F3',
          person: 'Player',
          text: 'Et som består av flere tilfeldige tall og bokstaver.',
          type: SpeechType.OPTION,
          next: 'D17F8',
        },
        {
          id: 'D17F4',
          person: 'Player',
          text: 'Et som består av forskjellige tegn og tall.',
          type: SpeechType.OPTION,
          next: 'D17F8',
        },
        {
          id: 'D17F5',
          person: 'Player',
          text: 'Et som består av forskjellige ord etter hverandre med sammenheng.',
          type: SpeechType.OPTION,
          next: 'D17F6',
        },
        {
          id: 'D17F8',
          person: 'Sebastian',
          text:
            'Det er ikke det jeg har hørt, men du vet når det står "husk meg". Når burde man IKKE bruke det?',
          type: SpeechType.QUESTION,
          options: ['D17F10', 'D17F11', 'D17F12'],
        },
        {
          id: 'D17F6',
          person: 'Sebastian',
          text:
            'Wow, det visste jeg ikke! Her står det også at jeg kan trykke på "husk meg". Når burde man IKKE bruke det?',
          type: SpeechType.QUESTION,
          options: ['D17F10', 'D17F11', 'D17F12'],
        },
        {
          id: 'D17F10',
          person: 'Player',
          text: 'Hvis flere bruker samme enhet.',
          type: SpeechType.OPTION,
          next: 'D17F13',
        },
        {
          id: 'D17F11',
          person: 'Player',
          text: 'Når man har dårlig tid.',
          type: SpeechType.OPTION,
          next: 'D17F17',
        },
        {
          id: 'D17F12',
          person: 'Player',
          text: 'Om man lett glemmer passord.',
          type: SpeechType.OPTION,
          next: 'D17F17',
        },
        {
          id: 'D17F13',
          person: 'Sebastian',
          text: 'Skjønner. Kan du hjelpe meg med å opprette en profil på Instagram?',
          type: SpeechType.COMPLETION,
        },
        {
          id: 'D17F17',
          person: 'Sebastian',
          text:
            'Det høres ikke logisk ut, men greit. Kan du hjelpe meg med å opprette en profil på Instagram?',
          type: SpeechType.COMPLETION,
        },
      ],
    };

    const result: ResultAnswer = questionsService.getResultAnswer(question, ['D17F3', 'D17F11']);
    expect(result).toEqual({
      id: 3,
      type: QuestionType.DIALOGUE,
      speech: [
        {
          id: 'D17F2',
          person: 'Sebastian',
          text:
            'Du skal hjelpe vennen din med å lage en Instagram-profil, så han kan delta på sosiale medier.',
          type: SpeechType.INTRO,
          next: 'D17F1',
        },
        {
          id: 'D17F1',
          person: 'Sebastian',
          text: 'Hei, jeg skal opprette en Instagram-profil. Hva slags passord er det best å ha?',
          type: SpeechType.QUESTION,
          options: ['D17F3', 'D17F4', 'D17F5'],
        },
        {
          id: 'D17F3',
          person: 'Player',
          text: 'Et som består av flere tilfeldige tall og bokstaver.',
          type: SpeechType.OPTION,
          next: 'D17F8',
        },
        {
          id: 'D17F4',
          person: 'Player',
          text: 'Et som består av forskjellige tegn og tall.',
          type: SpeechType.OPTION,
          next: 'D17F8',
        },
        {
          id: 'D17F5',
          person: 'Player',
          text: 'Et som består av forskjellige ord etter hverandre med sammenheng.',
          type: SpeechType.OPTION,
          next: 'D17F6',
        },
        {
          id: 'D17F8',
          person: 'Sebastian',
          text:
            'Det er ikke det jeg har hørt, men du vet når det står "husk meg". Når burde man IKKE bruke det?',
          type: SpeechType.QUESTION,
          options: ['D17F10', 'D17F11', 'D17F12'],
        },
        {
          id: 'D17F6',
          person: 'Sebastian',
          text:
            'Wow, det visste jeg ikke! Her står det også at jeg kan trykke på "husk meg". Når burde man IKKE bruke det?',
          type: SpeechType.QUESTION,
          options: ['D17F10', 'D17F11', 'D17F12'],
        },
        {
          id: 'D17F10',
          person: 'Player',
          text: 'Hvis flere bruker samme enhet.',
          type: SpeechType.OPTION,
          next: 'D17F13',
        },
        {
          id: 'D17F11',
          person: 'Player',
          text: 'Når man har dårlig tid.',
          type: SpeechType.OPTION,
          next: 'D17F17',
        },
        {
          id: 'D17F12',
          person: 'Player',
          text: 'Om man lett glemmer passord.',
          type: SpeechType.OPTION,
          next: 'D17F17',
        },
        {
          id: 'D17F13',
          person: 'Sebastian',
          text: 'Skjønner. Kan du hjelpe meg med å opprette en profil på Instagram?',
          type: SpeechType.COMPLETION,
        },
        {
          id: 'D17F17',
          person: 'Sebastian',
          text:
            'Det høres ikke logisk ut, men greit. Kan du hjelpe meg med å opprette en profil på Instagram?',
          type: SpeechType.COMPLETION,
        },
      ],
      selected: [
        {
          id: 'D17F1',
          person: 'Sebastian',
          text: 'Hei, jeg skal opprette en Instagram-profil. Hva slags passord er det best å ha?',
          type: 'question',
          options: ['D17F3', 'D17F4', 'D17F5'],
        },
        {
          id: 'D17F3',
          person: 'Player',
          text: 'Et som består av flere tilfeldige tall og bokstaver.',
          type: SpeechType.OPTION,
          next: 'D17F8',
        },
        {
          id: 'D17F8',
          person: 'Sebastian',
          text:
            'Det er ikke det jeg har hørt, men du vet når det står "husk meg". Når burde man IKKE bruke det?',
          type: SpeechType.QUESTION,
          options: ['D17F10', 'D17F11', 'D17F12'],
        },
        {
          id: 'D17F11',
          person: 'Player',
          text: 'Når man har dårlig tid.',
          type: SpeechType.OPTION,
          next: 'D17F17',
        },
        {
          id: 'D17F17',
          person: 'Sebastian',
          text:
            'Det høres ikke logisk ut, men greit. Kan du hjelpe meg med å opprette en profil på Instagram?',
          type: SpeechType.COMPLETION,
        },
      ],
      correct: [
        {
          id: 'D17F1',
          person: 'Sebastian',
          text: 'Hei, jeg skal opprette en Instagram-profil. Hva slags passord er det best å ha?',
          type: 'question',
          options: ['D17F3', 'D17F4', 'D17F5'],
        },
        {
          id: 'D17F5',
          person: 'Player',
          text: 'Et som består av forskjellige ord etter hverandre med sammenheng.',
          type: 'option',
          next: 'D17F6',
        },
        {
          id: 'D17F6',
          person: 'Sebastian',
          text:
            'Wow, det visste jeg ikke! Her står det også at jeg kan trykke på "husk meg". Når burde man IKKE bruke det?',
          type: 'question',
          options: ['D17F10', 'D17F11', 'D17F12'],
        },
        {
          id: 'D17F10',
          person: 'Player',
          text: 'Hvis flere bruker samme enhet.',
          type: 'option',
          next: 'D17F13',
        },
        {
          id: 'D17F13',
          person: 'Sebastian',
          text: 'Skjønner. Kan du hjelpe meg med å opprette en profil på Instagram?',
          type: 'completion',
        },
      ],
      isCorrect: false,
    });
  });

  /*it('QuestionHotspot getResult connect answers should report as connect', () => {});

  it('QuestionHotspot getResult inconnect answers should report as inconnect', () => {});

  it('QuestionMultipleDiffPoints getResult connect answers should report as connect', () => {});

  it('QuestionMultipleDiffPoints getResult inconnect answers should report as inconnect', () => {});

  it('QuestionRanking getResult connect answers should report as connect', () => {});

  it('QuestionRanking getResult inconnect answers should report as inconnect', () => {});

  it('QuestionSlider getResult connect answers should report as connect', () => {});

  it('QuestionSlider getResult inconnect answers should report as inconnect', () => {});

  it('QuestionGrading getResult connect answers should report as connect', () => {});

  it('QuestionGrading getResult inconnect answers should report as inconnect', () => {}); */
});
