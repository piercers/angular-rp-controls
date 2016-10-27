import {Component, Input, ChangeDetectionStrategy} from '@angular/core';
import {FormControl} from '@angular/forms';

@Component({
  selector: 'number-control',
  styles: [`
    :host {
      display: block;
    }

    label {
      display: block;
    }

    input {
      width: 100%;
    }
  `],
  template: `
    <input-control [control]="control" [label]="label" (id)="id = $event">
      <input
        #inputControlInput
        [formControl]="control"
        [placeholder]="placeholder"
        [id]="id"
        type="number"
        class="input-control"
      >
    </input-control>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class NumberControlComponent {
  @Input() control = new FormControl();
  @Input() label: string;
  @Input() placeholder = '';
}
