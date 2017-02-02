import {Component, Input, forwardRef} from '@angular/core';
import {ControlValueAccessor, NG_VALUE_ACCESSOR, FormControl} from '@angular/forms';

import {parseTime} from './util/time';

const formatType = (type, value) => {
  switch (type) {
    case 'time':
      return parseTime(value);

    default:
      return value;
  }
};

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
      [value]="_value"
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

  /**
   * Internal, formatted value
   */
  _value = '';

  hasFocus = false;

  touched = false;

  value = '';

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
  onInput(value, fromParent = false) {
    const formatted = formatType(this.type, value);
    if (fromParent) { // Update came from FormControl or NgModel
      this.value = formatted;
    }
    this._value = formatted;
    this.onChange(formatted);
  }

  writeValue(value) {
    this.onInput(value, true);
  }

  registerOnChange(fn) {
    this.onChange = fn;
  }

  registerOnTouched(fn) {
    this.onTouched = fn;
  }
}
