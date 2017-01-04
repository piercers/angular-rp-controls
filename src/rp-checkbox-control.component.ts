import {Component, forwardRef, Input, HostBinding, Output, EventEmitter, HostListener} from '@angular/core';
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
      [label]="label"
      [touched]="touched"
      [disabled]="disabled"
      [inline]="true"
      (labelClick)="onClick()"
      types="checkbox"
    >
      <input
        #rpControlInput
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

  @Output() check = new EventEmitter();

  touched = false;

  onChange = (x?: any) => {};

  onTouched = () => {};

  @HostListener('click') onClick() {
    const isChecked = !this.checked;
    this.onChange(isChecked);
    this.checked = isChecked;
    this.touched = true;
    this.onTouched();
    this.check.emit(isChecked);
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
