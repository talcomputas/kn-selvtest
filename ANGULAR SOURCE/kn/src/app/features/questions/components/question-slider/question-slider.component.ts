import { Component, OnInit, ChangeDetectionStrategy, OnChanges } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { QuestionComponentBaseDirective } from '@features/questions/components/question-component-base.directive';
import { QuestionSlider } from '@features/questions/interfaces/question-slider.interface';
import { SliderOption } from '@features/questions/interfaces/slider-option.interface';

@Component({
  selector: 'app-question-slider',
  templateUrl: './question-slider.component.html',
  styleUrls: ['./question-slider.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class QuestionSliderComponent
  extends QuestionComponentBaseDirective<QuestionSlider>
  implements OnInit {
  calculatorVisible: boolean;

  autoTicks = false;
  showTicks = true;
  defaultStep = 1;
  thumbLabel = true;
  tickInterval = 1;

  constructor(public dialog: MatDialog) {
    super();
  }

  ngOnInit(): void {
    // this.toggleCalculator();
  }

  onUserChange(changeContext: number): void {
    this.control.patchValue(changeContext);
  }

  onInputChange(value: any): void {
    // this.control.patchValue(value.target.value);
    this.onUserChange(value.target.value);
  }

  toggleCalculator(): void {
    // this.dialog.open(DialogCalculatorDialog);
    this.calculatorVisible = !this.calculatorVisible;
  }

  getStepInterval() {
    return this.question.options.steps ? this.question.options.steps : this.tickInterval;
  }

  getSliderTickInterval(): number | 'auto' {
    if (this.showTicks) {
      return this.autoTicks ? 'auto' : this.tickInterval;
    }

    return 0;
  }
}

@Component({
  selector: 'dialog-elements-example-dialog',
  templateUrl: 'dialog-calculator.html',
})
export class DialogCalculatorDialog {}
