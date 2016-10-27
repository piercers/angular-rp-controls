import {Component, Input} from '@angular/core';
import {FormControl} from '@angular/forms';

const days = [
  {
    value: 0,
    label: 'Sunday',
  },
  {
    value: 1,
    label: 'Monday',
  },
  {
    value: 2,
    label: 'Tuesday',
  },
  {
    value: 3,
    label: 'Wednesday',
  },
  {
    value: 4,
    label: 'Thursday',
  },
  {
    value: 5,
    label: 'Friday',
  },
  {
    value: 6,
    label: 'Saturday',
  },
];

@Component({
  selector: 'days-control',
  template: `
    <select-control
      label="Days"
      [control]="control"
      [limit]="0"
    >
      <select-option
        *ngFor="let day of days"
        [label]="day.label"
        [value]="day.value"
      ></select-option>
    </select-control>
  `,
})
export class DaysControlComponent {
  @Input() control = new FormControl();

  public days = days;
}
