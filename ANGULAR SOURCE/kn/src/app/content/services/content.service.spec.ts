import { ContentParser } from '@content/services/content.parser';
import { ContentService } from '@content/services/content.service';
import nbLeseTesten from '@i18n/bokmal.content.lesetesten.json';

describe('ContentService', () => {
  let contentService: ContentService;
  beforeEach(() => {
    contentService = new ContentService(new ContentParser());
    contentService.set('nb', nbLeseTesten);
    contentService.setCtx('nb');
  });

  it('should contain a certain keys', () => {
    expect(Object.keys(contentService.get('intro'))).toContain('label');
    expect(Object.keys(contentService.get('intro'))).toContain('title');

    expect(contentService.get('result.levels.3.id')).toEqual('3');
  });
  it('should be able to get value by nested keys', () => {
    expect(contentService.get('result.levels.3.id')).toEqual('3');
  });
});
