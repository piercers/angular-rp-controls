import {Component} from '@angular/core';
import {FormBuilder, Validators} from '@angular/forms';
import {entries} from 'lodash/fp';

import states from '../assets/states';

@Component({
  selector: 'app-root',
  styleUrls: ['./app.component.css'],
  templateUrl: './app.html',
})
export class AppComponent {
  public hours = this.fb.array([this.fb.group({
    days: [[]],
    start: [''],
    end: [''],
  })]);

  public form = this.fb.group({
    title: ['', Validators.required],
    password: ['', Validators.required],
    email: [''],
    phone: [''],
    date: [''],
    time: [''],
    number: [''],
    textarea: [''],
    textareaNoRte: [''],
    singleSelect: [],
    multipleSelect: [[]],
    selectNoOptions: [],
    toggleControl: [],
    durationControl: [],
    radiosControl: [],
    checkboxesControl: [],
    address: this.fb.group({
      street: [''],
      city: [''],
      state: [''],
      zip: [''],
    }),
    links: this.fb.array(['']),
    hours: this.hours,
  });

  public days = [
    {
      label: 'Monday',
      value: 'mon',
    },
    {
      label: 'Tuesday',
      value: 'tue',
    },
    {
      label: 'Wednesday',
      value: 'wed',
    },
    {
      label: 'Thursday',
      value: 'thu',
    },
    {
      label: 'Friday',
      value: 'fri',
    },
    {
      label: 'Saturday',
      value: 'sat',
    },
    {
      label: 'Sunday',
      value: 'sun',
    },
  ];

  public states = entries(states)
    .map(([abbr, name]) => ({
      label: name,
      value: abbr,
    }));

  constructor(private fb: FormBuilder) {}
}
