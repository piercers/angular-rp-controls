import {Component, ChangeDetectionStrategy} from '@angular/core';
import {FormBuilder, Validators} from '@angular/forms';
import {entries} from 'lodash/fp';

import states from '../assets/states';

@Component({
  selector: 'app-root',
  styleUrls: ['./app.component.css'],
  templateUrl: './app.html',
  // changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AppComponent {
  showErrors = false;

  days = entries([
    'Sunday',
    'Monday',
    'Tuesday',
    'Wednesday',
    'Thursday',
    'Friday',
    'Saturday',
  ])
    .map(([value, label]) => ({
      value: parseInt(value, 10),
      label,
    }));

  states = entries(states)
    .map(([abbr, name]) => ({
      label: name,
      value: abbr,
    }));

  rooms = [
    {
      type: 'bathroom',
      name: 'Bathroom',
    },
    {
      type: 'bedroom',
      name: 'Bedroom',
    },
    {
      type: 'kitchen',
      name: 'Kitchen',
    },
    {
      type: 'living',
      name: 'Living Room',
    },
    {
      type: 'garage',
      name: 'Garage',
    },
  ];

  hours = this.fb.array([this.fb.group({
    days: [[]],
    start: [''],
    end: [''],
  })]);

  form = this.fb.group({
    days: [],
    title: ['', Validators.required],
    password: ['', Validators.required],
    email: [''],
    phone: [''],
    date: [''],
    time: [''],
    number: [''],
    textarea: [],
    textareaNoRte: [],
    selectObjects: [[this.rooms[0]]],
    singleSelect: [],
    multipleSelect: [[]],
    selectNoOptions: [],
    toggleControl: [true],
    durationControl: [],
    radiosControl: [],
    checkboxesControl: [],
    address: this.fb.group({
      street: ['1234 Main Street'],
      street2: [''],
      city: [''],
      state: [''],
      zip: [''],
    }),
    links: this.fb.array(['']),
    hours: this.hours,
  });

  constructor(private fb: FormBuilder) {}
}
