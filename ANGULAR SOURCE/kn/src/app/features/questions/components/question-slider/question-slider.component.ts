import { Component, OnInit, ChangeDetectionStrategy, OnChanges, EventEmitter } from '@angular/core';
import { QuestionComponentBase } from '@features/questions/components/question-component-base';
import { QuestionSlider } from '@features/questions/interfaces/question-slider.interface';
import { ChangeContext, Options, PointerType } from 'ng5-slider';

@Component({
  selector: 'app-question-slider',
  templateUrl: './question-slider.component.html',
  styleUrls: ['./question-slider.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class QuestionSliderComponent
  extends QuestionComponentBase<QuestionSlider>
  implements OnInit, OnChanges {
  calculatorVisible: boolean;

  value = 0;
  optionsSlider: Options = {
    floor: 0,
    ceil: 100,
  };

  constructor() {
    super();
  }

  ngOnInit() {}

  ngOnChanges() {
    super.ngOnChanges();

    this.updateSliderOptions();
  }

  onUserChange(changeContext: ChangeContext): void {
    this.control.patchValue(changeContext.value);
  }

  private updateSliderOptions(): void {
    const floor = this.question.options.floor;
    const ceil = this.question.options.ceil;

    const newOptions = Object.assign({}, this.optionsSlider);
    newOptions.floor = floor;
    newOptions.ceil = ceil;
    this.optionsSlider = newOptions;
    this.value = floor;
  }

  toggleCalculator(): void {
    this.calculatorVisible = !this.calculatorVisible;
  }
}
