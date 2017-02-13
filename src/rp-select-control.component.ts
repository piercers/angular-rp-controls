import {Component, Input, forwardRef, ContentChildren} from '@angular/core';
import {ControlValueAccessor, NG_VALUE_ACCESSOR} from '@angular/forms';
import {castArray} from 'lodash/fp';

import {RpOptionComponent} from './rp-option.component';

const getSelectedLabels = (options = [], selected = '') => castArray(selected)
  .map(x => options.find(({value}) => x === value))
  .filter(x => x !== null && x !== undefined)
  .map(x => x.label)
  .join(', ');

// TODO Integrate with <rp-control> label?
// TODO Add <rp-control-errors> to menu?
// - Might be able to grab control off view's <rp-control>
//  #rpControl.control
// TODO Might be clearer and more consistent to always call the control value "value" instead of "selected"
@Component({
  selector: 'rp-select-control',
  providers: [{
    provide: NG_VALUE_ACCESSOR,
    useExisting: forwardRef(() => RpSelectControlComponent),
    multi: true,
  }],
  styles: [`
    rp-controls-dropdown {
      top: -.3em;
      left: -.3em;
    }
  `],
  template: `
    <rp-control
      [value]="selected"
      [hasFocus]="isOpen"
      [touched]="touched"
      [label]="label"
      (labelClick)="open()"
      types="select"
    >
      <button (click)="open()" class="rp-control__select-btn" type="button">
        <span *ngIf="names.length">{{names}}</span>
        <span *ngIf="!names.length" class="rp-control__placeholder">{{placeholder}}</span>
        <span class="rp-control__select-btn-icon">▾</span>
      </button>

      <rp-controls-dropdown [open]="isOpen" (overlayClick)="open()" class="is-absolute">
        <!-- Single Select -->
        <rp-radios-control *ngIf="limit === 1" [value]="selected" (changes)="select($event); open()">
          <rp-option *ngFor="let x of options" [value]="x.value" [label]="x.label"></rp-option>
        </rp-radios-control>

        <!-- Multiple Select -->
        <rp-checkboxes-control *ngIf="limit !== 1" [value]="selected" (changes)="select($event)" [limit]="limit">
          <rp-option *ngFor="let x of options" [value]="x.value" [label]="x.label"></rp-option>
        </rp-checkboxes-control>

        <!-- No options -->
        <fieldset *ngIf="!options.length">
          <div class="rp-control__list-item">No options.</div>
        </fieldset>
      </rp-controls-dropdown>
    </rp-control>
  `,
})
export class RpSelectControlComponent implements ControlValueAccessor {
  /**
   * Field Label
   */
  @Input() label: string;

  /**
   * Limit on number of selections (Zero is infinite)
   */
  @Input() limit = 1;

  /**
   * Text to show when nothing is selected
   */
  @Input() placeholder = 'Select...';

  /**
   * Whenever input changes, update control
   */
  @Input() set value(value) {
    this.writeValue(value);
  }

  @ContentChildren(RpOptionComponent) options;

  selected: any; // String or array

  isOpen = false;

  touched = false;

  onChange = (x?: any) => {};

  onTouched = () => {};

  /**
   * Comma-separated list of selected value labels
   */
  get names() {
    return getSelectedLabels(this.options.toArray(), this.selected);
  }

  select(value) {
    this.selected = value;
    this.onChange(this.selected);
  }

  /**
   * Toggle whether dropdown is open
   */
  open() {
    this.isOpen = !this.isOpen;

    if (!this.isOpen) {
      this.onTouched();
      this.touched = true;
    }
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
