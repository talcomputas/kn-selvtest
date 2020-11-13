import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { ContentService } from '@content/services/content.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HomeComponent {
  selectedLanguage: string;
  languageList: string[];

  constructor(public contentService: ContentService) {
    this.contentService.changes.subscribe((changed: boolean) => {
      this.languageList = this.contentService.getCtxList();
      this.selectedLanguage = this.contentService.getCtx();
    });
  }
}
