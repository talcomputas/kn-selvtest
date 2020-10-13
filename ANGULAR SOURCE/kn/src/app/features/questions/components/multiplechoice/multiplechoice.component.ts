import {
  ChangeDetectionStrategy,
  Component,
  Input,
  OnChanges,
  OnInit,
  SimpleChanges,
} from '@angular/core';
import {
  Options,
  Option,
} from '@features/questions/interfaces/option.interface';

@Component({
  selector: 'app-multiplechoice',
  templateUrl: './multiplechoice.component.html',
  styleUrls: ['./multiplechoice.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class MultipleChoiceComponent implements OnChanges, OnInit {
  @Input() options: Options;
  selectedItem: Option = null;

  ngOnInit(): void {
    //console.log(this.options);
  }

  onClick = (option: Option) => {
    this.selectedItem = option;
  };

  isActive = (option: Option) => {
    return this.selectedItem === option;
  };

  ngOnChanges(changes: SimpleChanges): void {}
}
