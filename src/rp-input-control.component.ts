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
  @Input() type = 'text';
  @Input() label: string;
  @Input() placeholder = '';
  @Input() formControl = new FormControl();
  @Input() formControlName: string;
  @Input() errors = {};
  @Output() changes = new EventEmitter();

  hasFocus = false;

  touched = false;

  value: any;

  onChange = (x?: any) => {};

  onTouched = () => {};

  touch() {
    this.hasFocus = false;
    this.touched = true;
    this.onTouched();
  }

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
