import {Component, Input, Output, EventEmitter, forwardRef, ContentChildren} from '@angular/core';
import {ControlValueAccessor, NG_VALUE_ACCESSOR} from '@angular/forms';

import {RpOptionComponent} from './rp-option.component';

@Component({
  selector: 'rp-radios-control',
  providers: [{
    provide: NG_VALUE_ACCESSOR,
    useExisting: forwardRef(() => RpRadiosControlComponent),
    multi: true,
  }],
  template: `
    <rp-control [value]="selected" [touched]="touched" [inline]="true" types="radios">
      <fieldset>
        <legend *ngIf="label">{{label}}</legend>

        <div
          *ngFor="let x of options"
          (click)="select(x.value)"
          [class.is-checked]="selected === x.value"
          class="rp-control__list-item rp-control__radio"
        >
          <label>
            {{x.label}}

            <input
              (click)="select(x.value)"
              [value]="x.value"
              [checked]="selected === x.value"
              type="radio"
            >
          </label>
        </div>
      </fieldset>
    </rp-control>
  `,
})
export class RpRadiosControlComponent implements ControlValueAccessor {
  @Input() label: string;

  @Input() set value(value) {
    this.writeValue(value);
  };

  @Output() changes = new EventEmitter();

  @ContentChildren(RpOptionComponent) options;

  touched = false;

  selected: any;

  onChange = (x?: any) => {};

  onTouched = () => {};

  select(selected) {
    this.selected = selected;
    this.onChange(selected);
    this.changes.emit(selected);
    this.touched = true;
    this.onTouched();
  }

  writeValue(value) {
    this.selected = value;
  }

  registerOnChange(fn) {
    this.onChange = fn;
  }

  registerOnTouched(fn) {
    this.onTouched = fn;
  }
}
