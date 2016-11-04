import {
  Component,
  OnInit,
  OnDestroy,
  Input,
  Optional,
  forwardRef,
} from '@angular/core';
import {NG_VALUE_ACCESSOR, FormGroup, FormControl, FormBuilder, AbstractControl, ControlValueAccessor} from '@angular/forms';
import {entries} from 'lodash/fp';
import {Subject} from 'rxjs/Subject';
import 'rxjs/add/operator/takeUntil';

import {RpFormGroupDirective} from './rp-form-group.directive';
import states from './assets/states';

@Component({
  selector: 'rp-address-control',
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => RpAddressControlComponent),
      multi: true,
    },
  ],
  template: `
    <form class="address" [formGroup]="addressForm">
      <label *ngIf="label">{{label}}</label>

      <rp-text-control formControlName="street1" label="Street" placeholder="123 Main Street"></rp-text-control>

      <rp-text-control formControlName="street2" placeholder="Optional"></rp-text-control>

      <rp-text-control formControlName="city" label="City" placeholder="Chicago"></rp-text-control>

      <rp-select-control formControlName="state" label="State">
        <rp-option *ngFor="let state of states" [value]="state[0]" [label]="state[1]"></rp-option>
      </rp-select-control>

      <rp-text-control formControlName="postal-code" label="Zip" placeholder="60602"></rp-text-control>
    </form>
  `,
})
export class RpAddressControlComponent implements ControlValueAccessor, OnInit, OnDestroy {
  @Input() label: string;
  @Input() formControlName: string;
  @Input() formControl: AbstractControl;

  private onDestroy = new Subject();

  public value = '';

  private form: FormGroup;

  public control: AbstractControl;

  public states = entries(states);

  public addressForm: FormGroup = this.fb.group({
    street1: [''],
    street2: [''],
    city: [''],
    state: [''],
    'postal-code': [''],
  });

  public onTouch = () => {};

  public onChange = (x: any) => {};

  constructor(@Optional() private rpFormGroup: RpFormGroupDirective, private fb: FormBuilder) {}

  ngOnInit() {
    this.form = this.rpFormGroup ? this.rpFormGroup.form : new FormGroup({});

    this.control = this.formControl || this.form.get(this.formControlName) || new FormControl();
  }

  ngOnDestroy() {
    this.onDestroy.next();
  }

  writeValue(value) {
    if (value !== undefined) {
      this.addressForm.patchValue(value || {});
    }
  }

  registerOnChange(fn) {
    this.addressForm.valueChanges
      .takeUntil(this.onDestroy)
      .subscribe(x => fn(x));
    }

  registerOnTouched(fn) {
    this.onTouch = fn;
  }
}
