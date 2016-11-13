import {Component} from '@angular/core';
import {FormBuilder, Validators} from '@angular/forms';

@Component({
  selector: 'app-root',
  styleUrls: ['./app.component.css'],
  template: `
    <h1>RP Controls</h1>

    <form [formGroup]="form">
      <rp-text-control label="Title" formControlName="title"></rp-text-control>

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
  });

  constructor(private fb: FormBuilder) {}
}
