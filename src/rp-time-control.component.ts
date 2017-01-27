import {Component, Input, Output, EventEmitter, forwardRef} from '@angular/core';
import {ControlValueAccessor, NG_VALUE_ACCESSOR} from '@angular/forms';

import {parseTime} from './util/time';

@Component({
  selector: 'rp-time-control',
  providers: [{
    provide: NG_VALUE_ACCESSOR,
    useExisting: forwardRef(() => RpTimeControlComponent),
    multi: true,
  }],
  template: `
    <rp-input-control
      [label]="label"
      [value]="value"
      (input)="onInput($event.target.value)"
      type="time"
    ></rp-input-control>
  `,
})
export class RpTimeControlComponent implements ControlValueAccessor {
  @Input() label: string;

  @Output() valueChange = new EventEmitter();

  value = '';

  onChange = (x?: any) => {};

  onTouched = () => {};

  onInput(value) {
    const formatted = parseTime(value);
    this.onChange(formatted);
    this.valueChange.emit(formatted);
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
