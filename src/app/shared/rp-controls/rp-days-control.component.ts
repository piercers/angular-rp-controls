import {
  Component,
  Input,
  OnInit,
  AfterViewInit,
  OnDestroy,
  ContentChildren,
} from '@angular/core';
import {ControlValueAccessor, FormGroup, AbstractControl, FormControl} from '@angular/forms';
import {Subject} from 'rxjs/Subject';
import {ReplaySubject} from 'rxjs/ReplaySubject';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/startWith';
import 'rxjs/add/operator/takeUntil';

import {provideValueAccessor} from './util/ng';
import {RpFormGroupDirective} from './rp-form-group.directive';
import {RpControlErrorDirective} from './rp-control-error.directive';

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
  selector: 'rp-days-control',
  providers: [
    provideValueAccessor(RpDaysControlComponent),
  ],
  template: `
    <rp-select-control
      [label]="label"
      [formControl]="control"
      [limit]="0"
    >
      <rp-option
        *ngFor="let day of days"
        [label]="day.label"
        [value]="day.value"
      ></rp-option>
    </rp-select-control>
  `,
})
export class RpDaysControlComponent implements ControlValueAccessor, OnInit, AfterViewInit, OnDestroy {
  @Input() label = 'Days';
  @Input() formControlName: string;
  @Input() formControl: AbstractControl;

  @ContentChildren(RpControlErrorDirective) contentErrors;

  public days = days;

  private onDestroy = new Subject();

  public _contentErrors = new ReplaySubject(1);

  public value = '';

  private form: FormGroup;

  public control: AbstractControl;

  public onTouch = () => {};

  public onChange = (x: any) => {};

  constructor(private rpFormGroup: RpFormGroupDirective) {}

  ngOnInit() {
    this.form = this.rpFormGroup.form;

    this.control = this.formControl || this.form.get(this.formControlName) || new FormControl();
  }

  ngAfterViewInit() {
    this.contentErrors.changes
      .startWith(this.contentErrors)
      .takeUntil(this.onDestroy)
      .subscribe(x => this._contentErrors.next(x.toArray()));
  }

  ngOnDestroy() {
    this.onDestroy.next();
  }

  writeValue(value) {
    this.value = value;
  }

  registerOnChange(fn) {
    this.onChange = fn;
  }

  registerOnTouched(fn) {
    this.onTouch = fn;
  }
}
