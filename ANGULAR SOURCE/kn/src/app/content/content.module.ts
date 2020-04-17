import { ModuleWithProviders, NgModule } from '@angular/core';
import { ContentService } from './services/content.service';
import { ContentParser } from './services/content.parser';
import { ContentPipe } from './pipes/content.pipe';

@NgModule({
  declarations: [
    ContentPipe,
  ],
  exports: [
    ContentPipe,
  ],
})
export class ContentModule {
  static forRoot(): ModuleWithProviders {
    return {
      ngModule: ContentModule,
      providers: [
        ContentService,
        ContentParser,
        ContentPipe,
      ],
    };
  }
}
