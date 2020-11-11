import { Component, ChangeDetectionStrategy, OnInit } from '@angular/core';
import { ContentService } from '@content/services/content.service';

@Component({
  selector: 'app-language',
  templateUrl: './language.component.html',
  styleUrls: ['./language.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class LanguageComponent implements OnInit {
  constructor(public content: ContentService) {}
  selectedLanguage: string;

  ngOnInit(): void {
    this.selectedLanguage = this.content.getCtx();
  }

  onLanguageChange(ctx: string) {
    this.content.setCtx(ctx);
  }
}
