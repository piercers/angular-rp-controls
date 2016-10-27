import {Component, Input, ChangeDetectionStrategy} from '@angular/core';
import {FormControl} from '@angular/forms';

@Component({
  selector: 'radio-control',
  host: {
    '[class.is-checked]': 'control.value === value',
  },
  styles: [`
    :host.is-checked {
      font-weight: bold;
    }

    input {
      float: right;
    }
  `],
  template: `
    <input-control
      [control]="control"
      [label]="label"
      (id)="id = $event"
      [inline]="true"
      [hideErrors]="true"
    >
      <input [formControl]="control" [value]="value" [id]="id" type="radio">
    </input-control>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class RadioControlComponent {
  @Input() control = new FormControl();
  @Input() label: string;
  @Input() value: any;
}
