import {Component} from '@angular/core';
import {FormBuilder, Validators} from '@angular/forms';

@Component({
  selector: 'controls-form',
  template: `
    <h1>Controls Form</h1>
    <div>Needs to be tab-able (Duration -> Units)</div>

    <form [formGroup]="form" (rpSubmit)="submit(form.value)" [showErrors]="true">
      <rp-text-control label="Text Control" formControlName="textControl">
        <rp-control-error type="required" message="You have GOT to fill this field out."></rp-control-error>
      </rp-text-control>

      <rp-password-control label="Password Control" formControlName="passwordControl"></rp-password-control>

      <rp-select-control label="Select Control (Single Select)" formControlName="selectControlSingle">
        <rp-option *ngFor="let x of [1, 2, 3, 4, 5]" label="Option {{x}}" [value]="x"></rp-option>
      </rp-select-control>

      <rp-select-control
        label="Select Control (Multiple; Limit: 2)"
        formControlName="selectControl"
        [limit]="2"
      >
        <rp-option *ngFor="let x of [1, 2, 3, 4, 5]" label="Option {{x}}" [value]="x"></rp-option>
      </rp-select-control>

      <rp-select-control label="Select Control (No Options)" formControlName="selectControlNoOptions"></rp-select-control>

      <rp-email-control label="Email Control" formControlName="emailControl"></rp-email-control>

      <rp-tel-control label="Tel Control" formControlName="telControl"></rp-tel-control>

      <rp-number-control label="Number Control" formControlName="numberControl"></rp-number-control>

      <rp-time-control label="Time Control" formControlName="timeControl"></rp-time-control>

      <rp-duration-control
        label="Duration Control"
        formControlName="durationControl"
        [units]="{minutes: 'Minutes', hours: 'Hours', days: 'Days'}"
      ></rp-duration-control>

      <rp-date-control label="Date Control" formControlName="dateControl"></rp-date-control>

      <rp-address-control label="Address Control" formControlName="addressControl"></rp-address-control>

      <rp-checkbox-control label="Checkbox Control" formControlName="checkboxControl"></rp-checkbox-control>

      <rp-toggle-control label="Toggle Control" formControlName="toggleControl"></rp-toggle-control>

      <rp-textarea-control label="Textarea Control" formControlName="textareaControl"></rp-textarea-control>

      <rp-textarea-control label="Textarea Control (No RTE)" formControlName="textareaControlNoRte" [rte]="false"></rp-textarea-control>

      <rp-hours-control label="Hours Control" formControlName="hoursControl"></rp-hours-control>

      <rp-radios-control label="Radios Control" formControlName="radiosControl">
        <rp-option *ngFor="let x of [1, 2, 3, 4, 5]" [value]="x"></rp-option>
      </rp-radios-control>

      <rp-checkboxes-control label="Checkboxes Control (Limit: 3)" formControlName="checkboxesControl" [limit]="3">
        <rp-option *ngFor="let x of [1, 2, 3, 4, 5]" [value]="x" label="Checkbox {{x}}"></rp-option>
      </rp-checkboxes-control>

      <button type="submit">Submit</button>
    </form>

    <code>
      <pre>{{form.valueChanges|async|json}}</pre>
    </code>
  `,
})
export default class ControlsFormComponent {
    // TODO Make another, pre-filled form
    public form = this.fb.group({
      addressControl: [],
      checkboxControl: [true],
      checkboxesControl: [],
      dateControl: ['', Validators.required],
      durationControl: [],
      emailControl: [],
      hoursControl: [],
      numberControl: [0, Validators.required],
      passwordControl: ['', Validators.required],
      radiosControl: [],
      selectControl: [[1, 3]],
      selectControlSingle: [2],
      selectControlNoOptions: [],
      telControl: [],
      textareaControl: [],
      textareaControlNoRte: [],
      textControl: ['', Validators.required],
      timeControl: [],
      toggleControl: [true],
    });

  constructor(private fb: FormBuilder) {}

  submit(form) {
    console.log(`form: `, form);
  }
}
