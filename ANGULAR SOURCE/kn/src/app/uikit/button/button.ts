import { FocusMonitor } from '@angular/cdk/a11y';
import {
  ChangeDetectionStrategy,
  Component,
  ElementRef,
  OnDestroy,
  ViewEncapsulation,
  Input,
  Directive,
} from '@angular/core';
import { coerceBooleanProperty } from '@angular/cdk/coercion';

@Directive({ selector: '[app-stroked-button]', host: { class: 'stroked-button' } })
export class StrokedButtonDirective {}

@Directive({ selector: '[app-raised-button]', host: { class: 'raised-button' } })
export class RaisedButtonDirective {}

@Directive({ selector: '[app-icon-button]', host: { class: 'icon-button' } })
export class IconButtonDirective {}

@Component({
  /* tslint:disable:component-selector */
  selector: `button[app-button], button[app-stroked-button], button[app-raised-button], button[app-icon-button]`,
  exportAs: 'button',
  host: {
    class: 'button',
    '[attr.disabled]': 'disabled || null',
    '[class.button-disabled]': 'disabled',
  },
  template: ` <ng-content></ng-content> `,
  styleUrls: ['button.scss'],
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ButtonComponent implements OnDestroy {
  @Input()
  set disabled(value: boolean) {
    this.isDisabled = coerceBooleanProperty(value);
  }

  get disabled(): boolean {
    return this.isDisabled;
  }

  private isDisabled: boolean;

  constructor(private elRef: ElementRef, private focusMonitor: FocusMonitor) {
    this.isDisabled = false;
    this.focusMonitor.monitor(this.elRef, true);
  }

  ngOnDestroy(): void {
    this.focusMonitor.stopMonitoring(this.elRef);
  }

  focus(): void {
    this.getHostElement().focus();
  }

  private getHostElement(): HTMLElement {
    return this.elRef.nativeElement;
  }
}

@Component({
  selector: `a[app-button], a[app-stroked-button], a[app-raised-button], a[app-icon-button]`,
  exportAs: 'button, a',
  host: {
    // Note that we ignore the user-specified tabindex when it's disabled for
    // consistency with the `app-button` applied on native buttons where even
    // though they have an index, they're not tabbable.
    '[attr.tabindex]': 'disabled ? -1 : (tabIndex || 0)',
    '[attr.disabled]': 'disabled || null',
    '[attr.aria-disabled]': 'disabled.toString()',
    class: 'button',
    '[class.button-disabled]': 'disabled',
    '(click)': 'haltDisabledEvents($event)',
  },
  template: ` <ng-content></ng-content> `,
  styleUrls: ['button.scss'],
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AnchorComponent extends ButtonComponent {
  @Input()
  public tabIndex: number;

  constructor(elRef: ElementRef, focusMonitor: FocusMonitor) {
    super(elRef, focusMonitor);
  }

  haltDisabledEvents(event: Event): void {
    // A disabled button shouldn't apply any actions
    if (this.disabled) {
      event.preventDefault();
      event.stopImmediatePropagation();
    }
  }
}
