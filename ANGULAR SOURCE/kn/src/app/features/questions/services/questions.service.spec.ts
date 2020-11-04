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
});
