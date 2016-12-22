import {Component, Input, Output, EventEmitter, forwardRef, ContentChildren} from '@angular/core';
import {ControlValueAccessor, NG_VALUE_ACCESSOR} from '@angular/forms';
import {castArray} from 'lodash';

import {RpOptionComponent} from './rp-option.component';

@Component({
  selector: 'rp-checkboxes-control',
  providers: [{
    provide: NG_VALUE_ACCESSOR,
    useExisting: forwardRef(() => RpCheckboxesControlComponent),
    multi: true,
  }],
  template: `
    <rp-control [value]="value" [touched]="touched">
      <fieldset>
        <legend *ngIf="label">{{label}}</legend>

        <label *ngFor="let x of options">
          {{x.label}}

          <rp-checkbox-control
            (click)="select(x.value)"
            [checked]="selected.has(x.value)"
            [disabled]="limit !== 0 && selected.size === limit && !selected.has(x.value)"
          ></rp-checkbox-control>
        </label>
      </fieldset>
    </rp-control>
  `,
})
export class RpCheckboxesControlComponent implements ControlValueAccessor {
  @Input() label: string;

  @Input() limit = 0;

  @Input() set value(value) {
    this.writeValue(value);
  }

  @Output() changes = new EventEmitter();

  @ContentChildren(RpOptionComponent) options;

  touched = false;

  selected = new Set();

  onChange = (x?: any) => {};

  onTouched = () => {};

  get value() {
    return Array.from(this.selected.values());
  }

  select(value) {
    if (this.selected.has(value)) {
      this.selected.delete(value);
    } else {
      if (this.selected.size === 0 || this.selected.size !== this.limit) {
        this.selected.add(value);
      }
    }

    this.onChange(this.value);
    this.changes.emit(this.value);

    this.touched = true;
  }

  writeValue(value) {
    castArray(value)
      .filter(x => x !== null && x !== undefined)
      .forEach(x => this.selected.add(x));
  }

  registerOnChange(fn) {
    this.onChange = fn;
  }

  registerOnTouched(fn) {
    this.onTouched = fn;
  }
}
