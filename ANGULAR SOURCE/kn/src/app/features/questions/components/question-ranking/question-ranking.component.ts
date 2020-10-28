import { ChangeDetectionStrategy, Component, OnChanges } from '@angular/core';
import { CdkDragDrop, moveItemInArray } from '@angular/cdk/drag-drop';
import { QuestionRanking } from '@features/questions/interfaces/question-ranking.interface';
import { QuestionComponentBaseDirective } from '@features/questions/components/question-component-base.directive';
import { Option } from '@features/questions/interfaces/option.interface';

@Component({
  selector: 'app-question-ranking',
  templateUrl: './question-ranking.component.html',
  styleUrls: ['./question-ranking.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class QuestionRankingComponent
  extends QuestionComponentBaseDirective<QuestionRanking>
  implements OnChanges {
  public options: Option[] = [];

  ngOnChanges(): void {
    super.ngOnChanges();
    this.options = [...this.question.options];
  }

  public drop(event: CdkDragDrop<Option[]>): void {
    if (!event) {
      return;
    }

    moveItemInArray(this.options, event.previousIndex, event.currentIndex);
  }
}
