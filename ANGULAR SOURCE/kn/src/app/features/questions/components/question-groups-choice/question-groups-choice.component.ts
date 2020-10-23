import { ChangeDetectionStrategy, Component, OnChanges, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { QuestionComponentBaseDirective } from '@features/questions/components/question-component-base.directive';
import { Options } from '@features/questions/interfaces/options.interface';
import { QuestionGroupsChoice } from '@features/questions/interfaces/question-groups-choice.interface';
import { isNumeric } from 'rxjs/util/isNumeric';

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

  constructor() {
    super();
  }

  ngOnInit(): void {
    this.questionId = this.question.id;
  }
  ngOnChanges(): void {
    super.ngOnChanges();
    const splitAry = this.getSplitText(this.question.text);
    console.log(splitAry);
  }

  getSplitText(value: string) {
    const ary = value.split('%s');

    let result = [];

    for (let i = 0; i < ary.length; i++) {
      if (ary[i] === '' && i < ary.length - 1) {
        result.push(i);
      } else {
        result.push(ary[i]);
        if (i < ary.length - 1) {
          result.push(i);
        }
      }
    }

    result = result.filter((e) => {
      return e === 0 || e;
    });
    console.log(result);
    return result;
  }

  isNumber(value: string | number): boolean {
    return isNumeric(value);
  }
}
