import {Component, ContentChildren, Input, ChangeDetectionStrategy} from '@angular/core';
import {FormControl} from '@angular/forms';

import {RadioControlComponent} from './radio-control.component';

@Component({
  selector: 'radio-control-set',
  template: `
    <fieldset class="rp-controls__fieldset">
      <legend *ngIf="label" class="rp-controls__legend">{{label}}</legend>

      <radio-control
        *ngFor="let option of options"
        [control]="control"
        [label]="option.label"
        [value]="option.value"
      ></radio-control>
    </fieldset>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class RadioControlSetComponent {
  @Input() control = new FormControl();
  @Input() label: string;
  @ContentChildren(RadioControlComponent) options;
}
