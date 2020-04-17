import { ChangeDetectionStrategy, Component } from '@angular/core';
import { QuestionHotspot } from '@features/questions/interfaces/question-hotspot.interface';
import { QuestionComponentBase } from '@features/questions/components/question-component-base';

@Component({
  selector: 'app-question-hotspot',
  templateUrl: './question-hotspot.component.html',
  styleUrls: ['./question-hotspot.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class QuestionHotspotComponent extends QuestionComponentBase<QuestionHotspot> {
}
