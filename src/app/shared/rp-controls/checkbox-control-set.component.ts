import {Component, ChangeDetectionStrategy, Input, ContentChildren} from '@angular/core';
import {FormControl} from '@angular/forms';

import {CheckboxControlComponent} from './checkbox-control.component';

@Component({
  selector: 'checkbox-control-set',
  template: `
    <fieldset class="rp-controls__fieldset">
      <legend *ngIf="label" class="rp-controls__legend">{{label}}</legend>

      <checkbox-control
        *ngFor="let option of options"
        [checked]="isChecked(option.value)"
        [label]="option.label"
      ></checkbox-control>
    </fieldset>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CheckboxControlSetComponent {
  @Input() control = new FormControl();
  @Input() label: string;
  @ContentChildren(CheckboxControlComponent) options;

  isChecked(value) {
    return this.control.value.includes(value);
  }
}
