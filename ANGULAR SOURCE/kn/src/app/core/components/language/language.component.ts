import { Component, ChangeDetectionStrategy } from '@angular/core';
import { ContentService } from '@content/services/content.service';

@Component({
  selector: 'app-language',
  templateUrl: './language.component.html',
  styleUrls: ['./language.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class LanguageComponent {
  constructor(public content: ContentService) {}

  select(ctx: string) {
    this.content.setCtx(ctx);
  }
}
