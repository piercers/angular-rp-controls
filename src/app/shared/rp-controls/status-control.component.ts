import {Component, ChangeDetectionStrategy, Input} from '@angular/core';
import {FormControl} from '@angular/forms';

@Component({
  selector: 'status-control',
  template: `
    <select-control label="Status" [control]="control">
      <select-option *ngFor="let option of options" [value]="option|lowercase" [label]="option"></select-option>
    </select-control>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class StatusControlComponent {
  @Input() control = new FormControl();

  public options = [
    'Hidden',
    'Live',
  ];
}
