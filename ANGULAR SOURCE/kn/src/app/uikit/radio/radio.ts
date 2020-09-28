import { FocusMonitor } from '@angular/cdk/a11y';
import { coerceBooleanProperty } from '@angular/cdk/coercion';
import { UniqueSelectionDispatcher } from '@angular/cdk/collections';
import {
  AfterContentInit,
  AfterViewInit,
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
let nextUniqueId = 0;

/** Change event object emitted by Radio and RadioGroup. */
export class RadioChange {
  constructor(public source: RadioButtonComponent, public value: any) {
  }
}

@Directive({
  selector: '[app-radio-group]',
  exportAs: 'appRadioGroup',
  providers: [{ provide: NG_VALUE_ACCESSOR, useExisting: forwardRef(() => RadioGroupDirective), multi: true }],
  host: { role: 'radiogroup', class: 'radio-group' },
})
export class RadioGroupDirective implements AfterContentInit, ControlValueAccessor {
  /**
   * Event emitted when the group value changes.
   * Change events are only emitted when the value changes due to user interaction with
   * a radio button (the same behavior as `<input type-"radio">`).
   */
  @Output()
  public readonly change: EventEmitter<RadioChange> = new EventEmitter<RadioChange>();

  @ContentChildren(forwardRef(() => RadioButtonComponent), { descendants: true })
  public radios: QueryList<RadioButtonComponent>;

  private innerValue: any;
  private innerName: string;
  private innerSelected: RadioButtonComponent | null = null;
  private isInitialized = false;
  private isDisabled: boolean;
  private isRequired: boolean;

  onChange: (value: any) => void = () => {
  };

  onTouched: () => any = () => {
  };

  /** Name of the radio button group. All radio buttons inside this group will use this name. */
  @Input()
  get name(): string {
    return this.innerName;
  }

  set name(value: string) {
    this.innerName = value;
    this.updateRadioButtonNames();
  }

  /**
   * Value for the radio-group. Should equal the value of the selected radio button if there is
   * a corresponding radio button with a matching value. If there is not such a corresponding
   * radio button, this value persists to be applied in case a new radio button is added with a
   * matching value.
   */
  @Input()
  get value(): any {
    return this.innerValue;
  }

  set value(newValue: any) {
    if (this.innerValue !== newValue) {
      // Set this before proceeding to ensure no circular loop occurs with selection.
      this.innerValue = newValue;

      this.updateSelectedRadioFromValue();
      this.checkSelectedRadioButton();
    }
  }

  /**
   * The currently selected radio button. If set to a new radio button, the radio group value
   * will be updated to match the new selected button.
   */
  @Input()
  get selected() {
    return this.innerSelected;
  }

  set selected(selected: RadioButtonComponent | null) {
    this.innerSelected = selected;
    this.value = selected ? selected.value : null;
    this.checkSelectedRadioButton();
  }

  /** Whether the radio group is disabled */
  @Input()
  get disabled(): boolean {
    return this.isDisabled;
  }

  set disabled(value) {
    this.isDisabled = coerceBooleanProperty(value);
    this.markRadiosForCheck();
  }

  /** Whether the radio group is required */
  @Input()
  get required(): boolean {
    return this.isRequired;
  }

  set required(value: boolean) {
    this.isRequired = coerceBooleanProperty(value);
    this.markRadiosForCheck();
  }

  constructor(private cdRef: ChangeDetectorRef) {
    this.innerName = `radio-group-${nextUniqueId++}`;
    this.innerValue = null;
    this.isDisabled = false;
    this.isRequired = false;
  }

  ngAfterContentInit() {
    this.isInitialized = true;
  }

  /**
   * Mark this group as being "touched" (for ngModel). Meant to be called by the contained
   * radio buttons upon their blur.
   */
  touch() {
    if (this.onTouched) {
      this.onTouched();
    }
  }

  emitChangeEvent(): void {
    if (this.isInitialized) {
      this.change.emit(new RadioChange(this.innerSelected!, this.innerValue));
    }
  }

  writeValue(value: any) {
    this.value = value;
    this.cdRef.markForCheck();
  }

  registerOnChange(fn: (value: any) => void) {
    this.onChange = fn;
  }

  registerOnTouched(fn: any) {
    this.onTouched = fn;
  }

  setDisabledState(isDisabled: boolean) {
    this.disabled = isDisabled;
    this.cdRef.markForCheck();
  }

  private updateRadioButtonNames(): void {
    if (this.radios) {
      this.radios.forEach(radio => {
        radio.name = this.name;
        radio.markForCheck();
      });
    }
  }

  /** Updates the `selected` radio button from the internal innerValue state. */
  private updateSelectedRadioFromValue(): void {
    // If the value already matches the selected radio, do nothing.
    const isSelected = this.innerSelected !== null && this.innerSelected.value === this.innerValue;

    if (this.radios && !isSelected) {
      this.innerSelected = null;
      this.radios.forEach(radio => {
        radio.checked = this.value === radio.value;
        if (radio.checked) {
          this.innerSelected = radio;
        }
      });
    }
  }

  private checkSelectedRadioButton() {
    if (this.innerSelected && !this.innerSelected.checked) {
      this.innerSelected.checked = true;
    }
  }

  private markRadiosForCheck(): void {
    if (!this.radios) {
      return;
    }

    this.radios.forEach(radio => radio.markForCheck());
  }
}


@Component({
  /* tslint:disable:component-selector */
  selector: '[app-radio-button]',
  styleUrls: ['./radio.scss'],
  templateUrl: './radio.html',
  encapsulation: ViewEncapsulation.None,
  exportAs: 'radioButton',
  host: {
    class: 'radio-button',
    '[class.radio-checked]': 'checked',
    '[class.radio-disabled]': 'disabled',
    // Needs to be -1 so the `focus` event still fires.
    '[attr.tabindex]': '-1',
    '[attr.id]': 'id',
    // Note: under normal conditions focus shouldn't land on this element, however it may be
    // programmatically set, for example inside of a focus trap, in this case we want to forward
    // the focus to the native element.
    '(focus)': 'inputElement.nativeElement.focus()',
  },
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class RadioButtonComponent implements OnInit, AfterViewInit, OnDestroy {
  /**
   * Event emitted when the checked state of this radio button changes.
   * Change events are only emitted when the value changes due to user interaction with
   * the radio button (the same behavior as `<input type-"radio">`).
   */
  @Output()
  public readonly change: EventEmitter<RadioChange> = new EventEmitter<RadioChange>();

  @Input()
  public id: string;

  /** Analog to HTML 'name' attribute used to group radios for unique selection. */
  @Input()
  public name: string;

  /** Used to set the 'aria-label' attribute on the underlying input element. */
  @Input('aria-label')
  public ariaLabel: string;

  /** The 'aria-labelledby' attribute takes precedence as the element's text alternative. */
  @Input('aria-labelledby')
  public ariaLabelledby: string;

  /** The 'aria-describedby' attribute is read after the element's label and field type. */
  @Input('aria-describedby')
  public ariaDescribedby: string;

  /** The native `<input type=radio>` element */
  @ViewChild('input', { static: true })
  public inputElement: ElementRef<HTMLInputElement>;

  /** Whether this radio button is checked. */
  @Input()
  get checked(): boolean {
    return this.isChecked;
  }

  set checked(value: boolean) {
    const newCheckedState = coerceBooleanProperty(value);

    if (this.isChecked !== newCheckedState) {
      this.isChecked = newCheckedState;
      if (newCheckedState && this.radioGroup && this.radioGroup.value !== this.value) {
        this.radioGroup.selected = this;
      } else if (!newCheckedState && this.radioGroup && this.radioGroup.value === this.value) {

        // When unchecking the selected radio button, update the selected radio
        // property on the group.
        this.radioGroup.selected = null;
      }

      if (newCheckedState) {
        // Notify all radio buttons with the same name to un-check.
        this.radioDispatcher.notify(this.id, this.name);
      }

      this.cdRef.markForCheck();
    }
  }

  /** The value of this radio button. */
  @Input()
  get value(): any {
    return this.innerValue;
  }

  set value(value: any) {
    if (this.innerValue !== value) {
      this.innerValue = value;
      if (this.radioGroup !== null) {
        if (!this.checked) {
          // Update checked when the value changed to match the radio group's value
          this.checked = this.radioGroup.value === value;
        }

        if (this.checked) {
          this.radioGroup.selected = this;
        }
      }
    }
  }

  /** Whether the radio button is disabled. */
  @Input()
  get disabled(): boolean {
    return this.isDisabled || (this.radioGroup !== null && this.radioGroup.disabled);
  }

  set disabled(value: boolean) {
    const newDisabledState = coerceBooleanProperty(value);
    if (this.isDisabled !== newDisabledState) {
      this.isDisabled = newDisabledState;
      this.cdRef.markForCheck();
    }
  }

  /** Whether the radio button is required. */
  @Input()
  get required(): boolean {
    return this.isRequired || (this.radioGroup && this.radioGroup.required);
  }

  set required(value: boolean) {
    this.isRequired = coerceBooleanProperty(value);
  }

  /** ID of the native input element inside `<radio-button>` */
  get inputId(): string {
    return `${this.id || this.uniqueId}-input`;
  }

  private uniqueId = `radio-${++nextUniqueId}`;
  private isChecked: boolean;
  private isDisabled: boolean;
  private isRequired: boolean;
  private innerValue: any;

  /** Unregister function for radioDispatcher */
  private removeUniqueSelectionListener: () => void = () => {
  };

  constructor(@Optional()
              public radioGroup: RadioGroupDirective,
              public elRef: ElementRef,
              private cdRef: ChangeDetectorRef,
              private focusMonitor: FocusMonitor,
              private radioDispatcher: UniqueSelectionDispatcher) {
    this.id = this.uniqueId;
    this.isChecked = false;
    this.innerValue = null;

    this.removeUniqueSelectionListener = radioDispatcher.listen((id: string, name: string) => {
      if (id !== this.id && name === this.name) {
        this.checked = false;
      }
    });
  }

  ngOnInit(): void {
    if (this.radioGroup) {
      // If the radio is inside a radio group, determine if it should be checked
      this.checked = this.radioGroup.value === this.innerValue;
      // Copy name from parent radio group
      this.name = this.radioGroup.name;
    }
  }

  ngAfterViewInit(): void {
    this.focusMonitor
      .monitor(this.elRef, true)
      .subscribe(focusOrigin => {
        if (!focusOrigin && this.radioGroup) {
          this.radioGroup.touch();
        }
      });
  }

  ngOnDestroy(): void {
    this.focusMonitor.stopMonitoring(this.elRef);
    this.removeUniqueSelectionListener();
  }

  /** Focuses the radio button. */
  focus(): void {
    this.focusMonitor.focusVia(this.inputElement, 'keyboard');
  }

  markForCheck(): void {
    this.cdRef.markForCheck();
  }

  onInputClick(event: Event): void {
    // We have to stop propagation for click events on the visual hidden input element.
    // By default, when a user clicks on a label element, a generated click event will be
    // dispatched on the associated input element. Since we are using a label element as our
    // root container, the click event on the `radio-button` will be executed twice.
    // The real click event will bubble up, and the generated click event also tries to bubble up.
    // This will lead to multiple click events.
    // Preventing bubbling for the second event will solve that issue.
    event.stopPropagation();
  }

  /**
   * Triggered when the radio button received a click or the input recognized any change.
   * Clicking on a label element, will trigger a change event on the associated input.
   */
  onInputChange(event: Event): void {
    // We always have to stop propagation on the change event.
    // Otherwise the change event, from the input element, will bubble up and
    // emit its event object to the `change` output.
    event.stopPropagation();

    const groupValueChanged = this.radioGroup && this.value !== this.radioGroup.value;
    this.checked = true;
    this.emitChangeEvent();

    if (this.radioGroup) {
      this.radioGroup.onChange(this.value);
      if (groupValueChanged) {
        this.radioGroup.emitChangeEvent();
      }
    }
  }

  /** Dispatch change event with current value. */
  private emitChangeEvent(): void {
    this.change.emit(new RadioChange(this, this.innerValue));
  }
}
