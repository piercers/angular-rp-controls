import {Component, EventEmitter} from '@angular/core';

/**
 * Checkboxes Control Component
 * <checkboxes-control
 *  [control]="form.get('checkboxField')" // Angular form control. Optional.
 *  [(model)]="model" // Two-way bound model to be used like ngModel
 *  [limit]="'integer'" // Maximum number of items that can be selected
 * >
 * 	<checkbox-option *ngFor="let option of options" [value]="option" [label]="option.title"></checkbox-option>
 * </checkboxes-control>
 */
@Component({
  selector: 'checkboxes-option',
  inputs: [
    'value',
    'label',
    'selected',
    'disabled',
    'view',
    'hideIcon',
  ],
  outputs: ['check'],
  host: {
    '[class.is-checked]': 'selected',
    '[class.is-toggle]': 'view === "toggle"',
    '[class.is-tag]': 'view === "tag"',
    '[class.is-disabled]': 'disabled',
  },
  template: `
    <label>
      <span class="checkboxes-option__label">{{label}}</span>
      <input
        #input
        (change)="check.emit(input.checked)"
        [checked]="selected"
        [disabled]="disabled"
        type="checkbox"
      >
      <span *ngIf="!hideIcon" class="checkboxes-option__box">
        <app-icon class="checkboxes-option__check" name="check"></app-icon>
      </span>
    </label>
  `,
})
export default class CheckboxesOptionComponent {
  constructor() {
    Object.assign(this, {
      check: new EventEmitter(),
    });
  }
}
