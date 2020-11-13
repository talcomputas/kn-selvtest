import { Component, ChangeDetectionStrategy, OnInit } from '@angular/core';
import { ContentService } from '@content/services/content.service';

@Component({
  selector: 'app-language',
  templateUrl: './language.component.html',
  styleUrls: ['./language.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class LanguageComponent {
  selectedLanguage: string;
  languageList: string[];

  constructor(public contentService: ContentService) {
    this.contentService.changes.subscribe((changed: boolean) => {
      this.languageList = this.contentService.getCtxList();
      this.selectedLanguage = this.contentService.getCtx();
    });
  }

  onLanguageChange(ctx: string) {
    this.contentService.setCtx(ctx);
  }
}
