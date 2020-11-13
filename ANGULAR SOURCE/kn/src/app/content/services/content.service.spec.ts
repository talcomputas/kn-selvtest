import { ContentParser } from '@content/services/content.parser';
import { ContentService } from '@content/services/content.service';

describe('ContentService', () => {
  let contentService: ContentService;
  beforeEach(() => {
    contentService = new ContentService(new ContentParser());
    contentService.set('nb', {
      intro: {
        label: 'Lesetesten',
        title: 'Lesetesten',
        text:
          'Dette er en kort lesetest som måler lesehastigheten din. Testen stopper automatisk etter 10 minutter. Det er mange oppgaver, så det er viktig å svare raskt og riktig.',
        image: 'reading-exam.svg',
      },
      ary: [1, 2, 3],
      ary2: {
        foo: [0, 2, 17],
      },
      result: {
        image: 'lesetesten-data-check.svg',
        levels: {
          1: {
            id: '1',
            title: 'text1',
            text: 'text2',
            minScore: 8,
          },
          2: {
            id: '2',
            title: 'text3',
            text: 'Resultatet',
            minScore: 12,
          },
          3: {
            id: '3',
            title: 'test4',
            text: 'lorem',
            minScore: 16,
          },
        },
      },
    });
    contentService.setCtx('nb');
  });

  it('should contain a certain keys', () => {
    expect(Object.keys(contentService.get('intro'))).toContain('label');
    expect(Object.keys(contentService.get('intro'))).toContain('title');
  });
  it('should be able to get value by nested keys', () => {
    expect(contentService.get('result.levels.3.id')).toEqual('3');
  });

  it('should be able to get object', () => {
    expect(contentService.get('result.levels.3')).toEqual({
      id: '3',
      title: 'test4',
      text: 'lorem',
      minScore: 16,
    });
  });

  it('should be able to get array', () => {
    expect(contentService.get('ary')).toEqual([1, 2, 3]);
  });

  it('should be able to get array by nested keys', () => {
    expect(contentService.get('ary2.foo')).toEqual([0, 2, 17]);
  });

  /* it('should throwError when trying to find non-existing key', () => {
    expect(() => {
      ;
    }).toThrow('Parsing is not possible');
  }); */

  /*   it('should throw an error if called without a number', () => {
    // tslint:disable-next-line: only-arrow-functions
    expect(function () {
      contentService.get('fail');
    }).toThrow();
  }); */
});
