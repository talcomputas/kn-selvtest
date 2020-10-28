import { Component, ChangeDetectionStrategy, Input } from '@angular/core';

@Component({
  selector: 'app-label',
  templateUrl: './label.component.html',
  host: { class: 'label' },
  styleUrls: ['./label.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class LabelComponent {
  @Input()
  text: string;

  @Input()
  imgUrl: string;
}
