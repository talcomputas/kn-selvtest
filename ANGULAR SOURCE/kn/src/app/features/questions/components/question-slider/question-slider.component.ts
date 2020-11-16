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
export class QuestionSliderComponent extends QuestionComponentBaseDirective<QuestionSlider> {
  calculatorVisible: boolean;

  autoTicks = false;
  showTicks = true;
  step = 1;
  thumbLabel = true;
  tickInterval = 10;

  onUserChange(changeContext: number): void {
    this.control.patchValue(changeContext);
  }

  toggleCalculator(): void {
    this.calculatorVisible = !this.calculatorVisible;
  }

  getSliderTickInterval(): number | 'auto' {
    if (this.showTicks) {
      return this.autoTicks ? 'auto' : this.tickInterval;
    }

    return 0;
  }
}
