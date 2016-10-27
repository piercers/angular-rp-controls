import {Component, OnInit, OnDestroy, Input, Output, ChangeDetectionStrategy, EventEmitter} from '@angular/core';
import {FormGroup, FormControl, FormBuilder} from '@angular/forms';
import {entries} from 'lodash/fp';
import {Subscription} from 'rxjs/Subscription';

import states from './assets/states';

@Component({
  selector: 'address-control',
  template: `
    <div class="address" [formGroup]="form">
      <label *ngIf="label">{{label}}</label>

      <text-control [control]="form.get('street1')" label="Street" placeholder="123 Main Street"></text-control>

      <text-control [control]="form.get('street2')" placeholder="Optional"></text-control>

      <text-control [control]="form.get('city')" label="City" placeholder="Chicago"></text-control>

      <select-control [control]="form.get('state')" label="State">
        <select-option *ngFor="let state of states" [value]="state[0]" [label]="state[1]"></select-option>
      </select-control>

      <text-control [control]="form.get('postal-code')" label="Zip" placeholder="60602"></text-control>
    </div>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AddressControlComponent implements OnInit, OnDestroy {
  @Input() control = new FormControl();
  @Input() label: string;
  @Input() model = {};
  @Output() modelChange = new EventEmitter();

  private subs: Subscription;
  public states = entries(states);
  public form: FormGroup = this.fb.group({
    street1: [''],
    street2: [''],
    city: [''],
    state: [''],
    'postal-code': [''],
  });

  constructor(private fb: FormBuilder) {}

  ngOnInit() {
    this.form.patchValue(this.control.value || this.model);

    this.subs = this.form.valueChanges
      .subscribe(x => {
        this.control.patchValue(x);
      });
  }

  ngOnDestroy() {
    this.subs.unsubscribe();
  }
}
