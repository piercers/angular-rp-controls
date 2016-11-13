import {Component} from '@angular/core';
import {FormBuilder, Validators} from '@angular/forms';

@Component({
  selector: 'app-root',
  styleUrls: ['./app.component.css'],
  template: `
    <h1>RP Controls</h1>

    <form [formGroup]="form">
      <rp-text-control label="Title" formControlName="title"></rp-text-control>

      <rp-password-control label="Password" formControlName="password"></rp-password-control>

      <rp-email-control label="Email" formControlName="email"></rp-email-control>

      <rp-tel-control label="Phone" formControlName="phone"></rp-tel-control>

      <rp-date-control label="Date" formControlName="date"></rp-date-control>

      <rp-time-control label="Time" formControlName="time"></rp-time-control>

      <rp-number-control label="Number" formControlName="number"></rp-number-control>

      <rp-textarea-control label="Textarea" formControlName="textarea"></rp-textarea-control>

      <rp-textarea-control label="Textarea (No Rich Text Editor)" formControlName="textareaNoRte" [rte]="false"></rp-textarea-control>

      <rp-select-control label="Single Select" formControlName="singleSelect">
        <rp-option *ngFor="let option of [1, 2, 3, 4, 5]" label="Option {{option}}" [value]="option"></rp-option>
      </rp-select-control>

      <rp-select-control label="Multiple Select (Limit: 3)" formControlName="multipleSelect" [limit]="3">
        <rp-option *ngFor="let option of [1, 2, 3, 4, 5]" label="Option {{option}}" [value]="option"></rp-option>
      </rp-select-control>

      <rp-select-control label="Select (No Options)" formControlName="selectNoOptions"></rp-select-control>

      <rp-toggle-control label="Toggle Control" formControlName="toggleControl"></rp-toggle-control>

      <rp-duration-control
        label="Duration Control"
        formControlName="durationControl"
        [units]="{hours: 'Hours', minutes: 'Minutes', days: 'Days'}"
      ></rp-duration-control>

      <rp-radios-control label="Radios Control" formControlName="radiosControl">
        <rp-option *ngFor="let option of [1, 2, 3, 4, 5]" label="Option {{option}}" [value]="option"></rp-option>
      </rp-radios-control>

      <rp-checkboxes-control label="Checkboxes Control" formControlName="checkboxesControl">
        <rp-option *ngFor="let option of [1, 2, 3, 4, 5]" label="Option {{option}}" [value]="option"></rp-option>
      </rp-checkboxes-control>

      <button type="submit">Submit</button>
    </form>

    <code>
      <pre>{{form.value|json}}</pre>
    </code>
  `,
})
export class AppComponent {
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
  });

  constructor(private fb: FormBuilder) {}
}
