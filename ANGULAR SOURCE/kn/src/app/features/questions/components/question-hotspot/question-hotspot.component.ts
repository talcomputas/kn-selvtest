import { ChangeDetectionStrategy, Component } from '@angular/core';
import { QuestionHotspot } from '@features/questions/interfaces/question-hotspot.interface';
import { QuestionComponentBaseDirective } from '@features/questions/components/question-component-base.directive';

@Component({
  selector: 'app-question-hotspot',
  templateUrl: './question-hotspot.component.html',
  styleUrls: ['./question-hotspot.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class QuestionHotspotComponent extends QuestionComponentBaseDirective<QuestionHotspot> {}
