import { Component, ChangeDetectionStrategy, Input } from '@angular/core';
import { Transition } from '@features/questions/interfaces/transition.interface';

@Component({
  selector: 'app-transition',
  templateUrl: './transition.component.html',
  styleUrls: ['./transition.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TransitionComponent {
  @Input()
  public readonly transition: Transition;
}
