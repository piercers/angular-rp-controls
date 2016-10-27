import {Component, Input, ChangeDetectionStrategy} from '@angular/core';
import {FormControl} from '@angular/forms';

@Component({
  selector: 'email-control',
  template: `
    <input-control [label]="label" [control]="control" (id)="id = $event">
      <input
        #inputControlInput
        [formControl]="control"
        [placeholder]="placeholder"
        [id]="id"
        type="email"
      >
    </input-control>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class EmailControlComponent {
  @Input() control = new FormControl();
  @Input() label: string;
  @Input() placeholder = 'example@gmail.com';
}
