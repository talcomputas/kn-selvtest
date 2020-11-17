import { Component, OnInit, ChangeDetectionStrategy, OnChanges } from '@angular/core';
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
