import { ChangeDetectionStrategy, Component, OnChanges, OnInit } from '@angular/core';
import { QuestionComponentBaseDirective } from '@features/questions/components/question-component-base.directive';
import { QuestionGroupsChoice } from '@features/questions/interfaces/question-groups-choice.interface';
import { isNumeric } from '@features/questions/utils/is-numeric.utils';
import { getSplitText } from '@features/questions/utils/split-text.utils';
@Component({
  selector: 'app-question-groupschoice',
  templateUrl: './question-groups-choice.component.html',
  styleUrls: ['./question-groups-choice.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class QuestionGroupsChoiceComponent
  extends QuestionComponentBaseDirective<QuestionGroupsChoice>
  implements OnChanges, OnInit {
  questionId: number;
  splitAry: any[];
  getSplitText = getSplitText;
  isNumberic = isNumeric;

  constructor() {
    super();
  }

  ngOnInit(): void {
    this.questionId = this.question.id;
  }
  ngOnChanges(): void {
    super.ngOnChanges();
  }
}
