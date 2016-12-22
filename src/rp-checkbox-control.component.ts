import {Component, forwardRef, Input, HostBinding} from '@angular/core';
import {ControlValueAccessor, NG_VALUE_ACCESSOR} from '@angular/forms';

@Component({
  selector: 'rp-checkbox-control',
  providers: [{
    provide: NG_VALUE_ACCESSOR,
    useExisting: forwardRef(() => RpCheckboxControlComponent),
    multi: true,
  }],
  template: `
    <rp-control
      [label]="label || value"
      [touched]="touched"
      [disabled]="disabled"
    >
      <input
        #rpControlInput
        (click)="onClick($event.target.checked)"
        [checked]="checked"
        [disabled]="disabled"
        type="checkbox"
      >
    </rp-control>
  `,
})
export class RpCheckboxControlComponent implements ControlValueAccessor {
  @Input() label: string;

  @Input() @HostBinding('class.is-checked') checked = false;

  @Input() disabled = false;

  touched = false;

  onChange = (x?: any) => {};

  onTouched = () => {};

  onClick(isChecked) {
    this.onChange(isChecked);
    this.checked = isChecked;
    this.touched = true;
    this.onTouched();
  }

  writeValue(value) {
    this.checked = value;
  }

  registerOnChange(fn) {
    this.onChange = fn;
  }

  registerOnTouched(fn) {
    this.onTouched = fn;
  }
}
