import {
  Component,
  ChangeDetectionStrategy,
  Input,
  SimpleChanges,
  ChangeDetectorRef,
  OnChanges,
  ElementRef,
  OnDestroy,
} from '@angular/core';

@Component({
  selector: 'app-level',
  templateUrl: './level.component.html',
  styleUrls: ['./level.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class LevelComponent implements OnChanges, OnDestroy {
  public readonly strokeDasharray = 350;
  public readonly strokeWidth = 15;

  @Input()
  public readonly percentage: number = 0;

  @Input()
  public readonly level: 1 | 2 | 3;

  @Input()
  public readonly text: string;

  @Input()
  public readonly delay: number = 200;

  public value: number;
  public scaleStrokeWidth = 0;

  private readonly defaultValue = 350;
  private readonly animationDurationMs = 850;

  constructor(private elRef: ElementRef, private cdRef: ChangeDetectorRef) {
    this.value = this.defaultValue;
  }

  ngOnChanges(changes: SimpleChanges): void {
    this.render();
    this.triggerRepaint();
  }

  ngOnDestroy(): void {
    this.value = this.defaultValue;
  }

  private render(): void {
    const pureValue = this.strokeDasharray * ((100 - this.percentage) / 100);
    const roundOffset = this.strokeWidth / 2;

    setTimeout(() => {
      this.value =
        this.percentage < 100 && this.percentage > 0 ? pureValue + roundOffset : pureValue;
      this.scaleStrokeWidth = this.percentage > 0 ? this.strokeWidth : 0;
      this.cdRef.markForCheck();
    }, this.delay);
  }

  private triggerRepaint(): void {
    setTimeout(() => {
      this.elRef.nativeElement.style.opacity = '1';
    }, this.animationDurationMs);
  }
}
