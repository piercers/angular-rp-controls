import {Component, Input, ChangeDetectionStrategy} from '@angular/core';
import {FormControl} from '@angular/forms';

@Component({
  selector: 'text-control',
  template: `
    <input-control [control]="control" [label]="label" (id)="id = $event">
      <input
        #inputControlInput
        [formControl]="control"
        [placeholder]="placeholder"
        [id]="id"
        class="input-control"
        type="text"
      >
    </input-control>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TextControlComponent {
  @Input() control = new FormControl();
  @Input() label: string;
  @Input() placeholder = '';
}
