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

  it('intro should contain a certain keys', () => {
    expect(Object.keys(contentService.get('intro'))).toContain('label');
    expect(Object.keys(contentService.get('intro'))).toContain('title');
  });
});
