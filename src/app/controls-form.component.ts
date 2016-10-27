import {Component, ChangeDetectionStrategy} from '@angular/core';
import {FormBuilder} from '@angular/forms';

@Component({
  selector: 'controls-form',
  template: `
    <h1>Controls Form</h1>
    <span>Needs to be tab-able (Duration -> Units)</span>

    <form [formGroup]="form">
      <text-control label="Text Control" [control]="form.get('textControl')"></text-control>

      <password-control label="Password Control" [control]="form.get('passwordControl')"></password-control>

      <email-control label="Email Control" [control]="form.get('emailControl')"></email-control>
      <span>Needs default validation</span>

      <tel-control label="Tel Control" [control]="form.get('telControl')"></tel-control>
      <span>Needs default validation</span>

      <number-control label="Number Control" [control]="form.get('numberControl')"></number-control>

      <time-control label="Time Control" [control]="form.get('timeControl')"></time-control>

      <duration-control
        label="Duration"
        [control]="form.get('durationControl')"
        placeholder="Minutes, Hours, Days"
        [units]="{minutes: 'Minutes', hours: 'Hours', days: 'Days'}"
      ></duration-control>

      <date-control label="Date Control" [control]="form.get('dateControl')"></date-control>

      <address-control label="Address Control" [control]="form.get('addressControl')"></address-control>

      <select-control
        label="Select Control (Multiple; Limit: 2)"
        [control]="form.get('selectControl')"
        [limit]="2"
      >
        <select-option *ngFor="let x of [1, 2, 3, 4, 5]" label="Option {{x}}" [value]="x"></select-option>
      </select-control>

      <select-control label="Select Control (Single Select)" [control]="form.get('selectControlSingle')">
        <select-option *ngFor="let x of [1, 2, 3, 4, 5]" label="Option {{x}}" [value]="x"></select-option>
      </select-control>

      <select-control label="Select Control (No Options)" [control]="form.get('selectControlNoOptions')"></select-control>

      checkbox-control-set

      <checkbox-control
        label="Checkbox Control"
        [control]="form.get('checkboxControl')"
        [checked]="form.get('checkboxControl').value"
      ></checkbox-control>

      <radio-control-set label="Radio Control Set" [control]="form.get('radioControl')">
        <radio-control *ngFor="let x of [1, 2, 3, 4, 5]" label="Option {{x}}" [value]="x"></radio-control>
      </radio-control-set>

      <toggle-control label="Toggle Control" [control]="form.get('toggleControl')"></toggle-control>

      <textarea-control label="Textarea Control" [control]="form.get('textareaControl')"></textarea-control>

      <textarea-control label="Textarea Control (No RTE)" [control]="form.get('textareaControlNoRte')" [rte]="false"></textarea-control>

      <hours-control label="Hours Control" [control]="form.get('hoursControl')"></hours-control>
    </form>

    <code>
      <pre>{{form.valueChanges|async|json}}</pre>
    </code>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export default class ControlsFormComponent {
    public form = this.fb.group({
      textControl: [],
      passwordControl: [],
      emailControl: [],
      telControl: [],
      numberControl: [],
      timeControl: [],
      durationControl: [],
      dateControl: [],
      addressControl: [],
      selectControl: [[1, 3]],
      selectControlSingle: [2],
      selectControlNoOptions: [],
      checkboxControl: [true],
      radioControl: [],
      toggleControl: [],
      textareaControl: [],
      textareaControlNoRte: [],
      hoursControl: [],
    });

  constructor(private fb: FormBuilder) {}
}
