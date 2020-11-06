import { FocusMonitor } from '@angular/cdk/a11y';
import { coerceBooleanProperty } from '@angular/cdk/coercion';
import { SelectionModel } from '@angular/cdk/collections';
import {
  AfterContentInit,
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  ContentChildren,
  Directive,
  ElementRef,
  EventEmitter,
  forwardRef,
  Input,
  OnDestroy,
  OnInit,
  Optional,
  Output,
  QueryList,
  ViewChild,
  ViewEncapsulation,
} from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';

// Increasing integer for generating unique ids for radio components.
let uniqueIdCounter = 0;

/** Change event object emitted by ButtonToggleComponent. */
export class ButtonToggleChange {
  constructor(public source: ButtonToggleComponent, public value: any) {}
}

@Directive({
  selector: '[app-button-toggle-group]',
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => ButtonToggleGroupDirective),
      multi: true,
    },
  ],
  host: { role: 'group', class: 'button-toggle-group', '[attr.aria-disabled]': 'disabled' },
  exportAs: 'appButtonToggleGroup',
})
export class ButtonToggleGroupDirective implements ControlValueAccessor, AfterContentInit {
  @Output()
  public readonly change: EventEmitter<ButtonToggleChange> = new EventEmitter<ButtonToggleChange>();

  @Output()
  public readonly valueChange = new EventEmitter<any>();

  @Input()
  public readonly limit: number;

  @ContentChildren(forwardRef(() => ButtonToggleComponent))
  public buttonToggles: QueryList<ButtonToggleComponent>;

  private rawValue: any;
  private innerName: string;
  private isDisabled: boolean;
  private selectionModel: SelectionModel<ButtonToggleComponent>;

  @Input()
  get name(): string {
    return this.innerName;
  }

  set name(value: string) {
    this.innerName = value;

    if (this.buttonToggles) {
      this.buttonToggles.forEach((toggle) => {
        toggle.name = this.innerName;
        toggle.markForCheck();
      });
    }
  }

  onChange: (value: any) => void = () => {};

  onTouched: () => any = () => {};

  @Input()
  get value(): any {
    const selected = this.selectionModel ? this.selectionModel.selected : [];
    return selected.map((toggle) => toggle.value);
  }

  set value(newValue: any) {
    this.setSelectionByValue(newValue);
    this.valueChange.emit(this.value);
  }

  get selected() {
    return this.selectionModel.selected;
  }

  @Input()
  get disabled(): boolean {
    return this.isDisabled;
  }

  set disabled(value: boolean) {
    this.isDisabled = coerceBooleanProperty(value);

    if (this.buttonToggles) {
      this.buttonToggles.forEach((toggle) => toggle.markForCheck());
    }
  }

  constructor(private cdRef: ChangeDetectorRef) {
    this.innerName = `button-toggle-group-${uniqueIdCounter++}`;
    this.isDisabled = false;
    this.selectionModel = new SelectionModel<ButtonToggleComponent>(true, undefined, false);
  }

  ngAfterContentInit(): void {
    this.selectionModel.select(...this.buttonToggles.filter((toggle) => toggle.checked));
    this.handleLimit();
  }

  writeValue(value: any): void {
    this.value = value;
    this.cdRef.markForCheck();
  }

  registerOnChange(fn: (value: any) => void) {
    this.onChange = fn;
  }

  registerOnTouched(fn: any) {
    this.onTouched = fn;
  }

  setDisabledState(isDisabled: boolean): void {
    this.disabled = isDisabled;
  }

  syncButtonToggle(
    toggle: ButtonToggleComponent,
    select: boolean,
    isUserInput = false,
    deferEvents = false,
  ) {
    if (select) {
      this.selectionModel.select(toggle);
    } else {
      this.selectionModel.deselect(toggle);
    }

    // We need to defer in some cases in order to avoid "changed after checked errors", however
    // the side-effect is that we may end up updating the model value out of sequence in others
    // The `deferEvents` flag allows us to decide whether to do it on a case-by-case basis.
    if (deferEvents) {
      Promise.resolve(() => this.updateModelValue(isUserInput));
    } else {
      this.updateModelValue(isUserInput);
    }
  }

  /** Checks whether a button toggle is selected. */
  isSelected(toggle: ButtonToggleComponent) {
    return this.selectionModel.isSelected(toggle);
  }

  /** Determines whether a button toggle should be checked on init. */
  isPrechecked(toggle: ButtonToggleComponent): boolean {
    if (typeof this.rawValue === 'undefined') {
      return false;
    }

    if (Array.isArray(this.rawValue)) {
      return this.rawValue.some((value) => toggle.value != null && value === toggle.value);
    }
    return false;
  }

  private emitChangeEvent(): void {
    const selected = this.selected;
    const source = Array.isArray(selected) ? selected[selected.length - 1] : selected;
    const event = new ButtonToggleChange(source!, this.value);
    this.onChange(event.value);
    this.change.emit(event);
  }

  /** Updates the selection state of the toggles in the group based on a value. */
  private setSelectionByValue(value: any[]) {
    this.rawValue = value;

    if (!this.buttonToggles || !value) {
      return;
    }

    if (!Array.isArray(value)) {
      throw Error('Value must be an array in multiple-selection mode.');
    }

    this.clearSelection();
    value.forEach((currentValue: any) => this.selectValue(currentValue));
  }

  /** Clears the selected toggles. */
  private clearSelection() {
    this.selectionModel.clear();
    this.buttonToggles.forEach((toggle) => (toggle.checked = false));
  }

  /** Selects a value if there's a toggle that corresponds to it. */
  private selectValue(value: any) {
    const correspondingOption = this.buttonToggles.find(
      (toggle) => toggle.value != null && toggle.value === value,
    );

    if (correspondingOption) {
      correspondingOption.checked = true;
      this.selectionModel.select(correspondingOption);
    }
  }

  /** Syncs up the group's value with the model and emits the change event. */
  private updateModelValue(isUserInput: boolean) {
    // Only emit the change event for user input.
    if (isUserInput) {
      this.emitChangeEvent();
    }

    this.handleLimit();

    // Note: we emit this one no matter whether it was a user interaction, because
    // it is used by Angular to sync up the two-way data binding.
    this.valueChange.emit(this.value);
  }

  private handleLimit(): void {
    if (!this.limit || !this.buttonToggles) {
      return;
    }

    const selectedItemsCount = this.buttonToggles.filter((toggle) => toggle.checked === true)
      .length;

    if (selectedItemsCount < this.limit) {
      this.buttonToggles.forEach((toggle) => (toggle.disabled = false));
      return;
    }

    this.buttonToggles.forEach((toggle) => (toggle.disabled = !toggle.checked));
    this.cdRef.detectChanges();
  }
}

@Component({
  /* tslint:disable:component-selector */
  selector: '[app-button-toggle]',
  templateUrl: './button-toggle.html',
  styleUrls: ['./button-toggle.scss'],
  encapsulation: ViewEncapsulation.None,
  exportAs: 'buttonToggle',
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: {
    '[class.button-toggle-standalone]': '!buttonToggleGroup',
    '[class.button-toggle-checked]': 'checked',
    '[class.button-toggle-disabled]': 'disabled',
    class: 'button-toggle',
    // Always reset the tabindex to -1 so it doesn't conflict with the one on the `button`,
    // but can still receive focus from things like cdkFocusInitial.
    '[attr.tabindex]': '-1',
    '[attr.id]': 'id',
    '[attr.name]': 'null',
    '(focus)': 'focus()',
  },
})
export class ButtonToggleComponent implements OnInit, OnDestroy {
  /** Event emitted when the group value changes. */
  @Output()
  public readonly change: EventEmitter<ButtonToggleChange> = new EventEmitter<ButtonToggleChange>();

  @ViewChild('button', { static: true })
  public readonly buttonElement: ElementRef<HTMLButtonElement>;

  /**
   * Attached to the aria-label attribute of the host element. In most cases, arial-labelledby will
   * take precedence so this may be omitted.
   */
  @Input('aria-label')
  public ariaLabel: string;

  /**
   * Users can specify the `aria-labelledby` attribute which will be forwarded to the input element
   */
  @Input('aria-labelledby')
  public ariaLabelledby: string | null = null;

  /** The unique ID for this button toggle. */
  @Input()
  public id: string;

  /** HTML's 'name' attribute used to group radios for unique selection. */
  @Input()
  public name: string;

  /** ButtonToggleGroup reads this to assign its own value. */
  @Input()
  public value: any;

  /** Tabindex for the toggle. */
  @Input()
  public tabIndex: number | null;

  /** Unique ID for the underlying `button` element. */
  get buttonId(): string {
    return `${this.id}-button`;
  }

  /** Whether the button is checked. */
  @Input()
  get checked(): boolean {
    return this.buttonToggleGroup ? this.buttonToggleGroup.isSelected(this) : this.isChecked;
  }

  set checked(value: boolean) {
    const newValue = coerceBooleanProperty(value);

    if (newValue !== this.isChecked) {
      this.isChecked = newValue;

      if (this.buttonToggleGroup) {
        this.buttonToggleGroup.syncButtonToggle(this, this.isChecked);
      }

      this.cdRef.markForCheck();
    }
  }

  /** Whether the button is disabled. */
  @Input()
  get disabled(): boolean {
    return this.isDisabled || (this.buttonToggleGroup && this.buttonToggleGroup.disabled);
  }

  set disabled(value: boolean) {
    this.isDisabled = coerceBooleanProperty(value);
  }

  private isDisabled: boolean;
  private isChecked: boolean;

  constructor(
    @Optional()
    public buttonToggleGroup: ButtonToggleGroupDirective,
    private cdRef: ChangeDetectorRef,
    private elRef: ElementRef<HTMLElement>,
    private focusMonitor: FocusMonitor,
  ) {
    this.isDisabled = false;
    this.isChecked = false;
  }

  ngOnInit(): void {
    this.id = this.id || `button-toggle-${uniqueIdCounter++}`;

    if (this.buttonToggleGroup && this.buttonToggleGroup.isPrechecked(this)) {
      this.checked = true;
    }

    this.focusMonitor.monitor(this.elRef, true);
  }

  ngOnDestroy(): void {
    const group = this.buttonToggleGroup;

    this.focusMonitor.stopMonitoring(this.elRef);

    // Remove the toggle from the selection once it's destroyed. Needs to happen
    // on the next tick in order to avoid "changed after checked" errors.
    if (group && group.isSelected(this)) {
      group.syncButtonToggle(this, false, false, true);
    }
  }

  /** Focuses the button. */
  focus(): void {
    this.buttonElement.nativeElement.focus();
  }

  /** Checks the button toggle due to an interaction with the underlying native button. */
  onButtonClick(): void {
    if (this.disabled) {
      return;
    }

    const newChecked = !this.isChecked;

    if (newChecked !== this.isChecked) {
      this.isChecked = newChecked;
      if (this.buttonToggleGroup) {
        this.buttonToggleGroup.syncButtonToggle(this, this.isChecked, true);
        this.buttonToggleGroup.onTouched();
      }
    }

    // Emit a change event when it's the single selector
    this.change.emit(new ButtonToggleChange(this, this.value));
  }

  markForCheck() {
    this.cdRef.markForCheck();
  }
}
