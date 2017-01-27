import {Component, Input, Output, EventEmitter, forwardRef} from '@angular/core';
import {ControlValueAccessor, NG_VALUE_ACCESSOR, FormControl} from '@angular/forms';

@Component({
  selector: 'rp-input-control',
  providers: [{
    provide: NG_VALUE_ACCESSOR,
    useExisting: forwardRef(() => RpInputControlComponent),
    multi: true,
  }],
  template: `
    <rp-control
      [label]="label"
      [value]="value"
      [hasFocus]="hasFocus"
      [touched]="touched"
      [errors]="errors"
      [types]="['text', type]"
    >
      <input
        #rpControlInput
        (input)="onInput($event.target.value)"
        (focus)="hasFocus = true"
        (blur)="touch()"
        [type]="type"
        [value]="value"
        [placeholder]="placeholder"
      >
    </rp-control>
  `,
})
export class RpInputControlComponent implements ControlValueAccessor {
  /**
   * Type of input (text, date, password, email, etc)
   */
  @Input() type = 'text';

  /**
   * Control label string
   */
  @Input() label: string;

  /**
   * Placeholder text for input field
   */
  @Input() placeholder = '';

  /**
   * Optional way to associate with a FormControl
   */
  @Input() formControl = new FormControl();

  /**
   * Optional way to associate with a FormControl
   */
  @Input() formControlName: string;

  /**
   * Field-level error messages
   */
  @Input() errors = {};

  private _value: string;

  /**
   * When not using @angular/forms, pass value in through this input
   */
  @Input() set value(x) {
    this._value = x;
  }

  get value() {
    return this._value;
  }

  /**
   * Output control value as it changes
   */
  @Output() changes = new EventEmitter(); // TODO Rename valueChange

  hasFocus = false;

  touched = false;

  onChange = (x?: any) => {};

  onTouched = () => {};

  /**
   * Mark as touched on <input> blur
   */
  touch() {
    this.hasFocus = false;
    this.touched = true;
    this.onTouched();
  }

  /**
   * Report changes on input
   */
  onInput(value) {
    this.value = value;
    this.onChange(value);
    this.changes.emit(value);
  }

  writeValue(value) {
    this.value = value;
  }

  registerOnChange(fn) {
    this.onChange = fn;
  }

  registerOnTouched(fn) {
    this.onTouched = fn;
  }
}
