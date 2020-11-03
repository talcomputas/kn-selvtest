import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import {
  Component,
  ChangeDetectionStrategy,
  Input,
  EventEmitter,
  Output,
  OnInit,
} from '@angular/core';

@Component({
  selector: 'app-layout',
  templateUrl: './layout.component.html',
  styleUrls: ['./layout.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class LayoutComponent implements OnInit {
  @Input()
  layoutClass = '';

  @Output()
  readonly layoutSize = new EventEmitter<string>();

  constructor(private breakpointObserver: BreakpointObserver) {}
  ngOnInit(): void {
    this.breakpointObserver
      .observe([
        Breakpoints.XSmall,
        Breakpoints.Small,
        Breakpoints.Medium,
        Breakpoints.Large,
        Breakpoints.XLarge,
      ])
      .subscribe((result) => {
        if (result.breakpoints[Breakpoints.XSmall]) {
          this.layoutSize.emit('xsmall');
        }
        if (result.breakpoints[Breakpoints.Small]) {
          this.layoutSize.emit('small');
        }
        if (result.breakpoints[Breakpoints.Medium]) {
          this.layoutSize.emit('medium');
        }
        if (result.breakpoints[Breakpoints.Large]) {
          this.layoutSize.emit('large');
        }
        if (result.breakpoints[Breakpoints.XLarge]) {
          this.layoutSize.emit('xlarge');
        }
      });
  }
}
