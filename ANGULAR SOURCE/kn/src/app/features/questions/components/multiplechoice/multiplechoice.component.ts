import { Component, Input, OnChanges, SimpleChanges } from '@angular/core';
import {
  Options,
  Option,
} from '@features/questions/interfaces/option.interface';

@Component({
  selector: 'app-multiplechoice',
  templateUrl: './multiplechoice.component.html',
  styleUrls: ['./multiplechoice.component.scss'],
})
export class MultipleChoiceComponent implements OnChanges {
  @Input() options: Options;
  @Input() index: number;

  opts: Option;

  ngOnChanges(changes: SimpleChanges): void {
    console.log(this.options);
    console.log(this.index);
  }
}
