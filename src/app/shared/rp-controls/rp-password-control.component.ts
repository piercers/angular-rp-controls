import {
  Component,
  ContentChildren,
  OnInit,
  AfterViewInit,
  OnDestroy,
  Input,
  Optional,
} from '@angular/core';
import {ControlValueAccessor, AbstractControl, FormControl, FormGroup} from '@angular/forms';
import {Subject} from 'rxjs/Subject';
import {ReplaySubject} from 'rxjs/ReplaySubject';

import {provideValueAccessor} from './util/ng';
import {RpControlErrorDirective} from './rp-control-error.directive';
import {RpFormGroupDirective} from './rp-form-group.directive';

@Component({
  selector: 'rp-password-control',
  providers: [
    provideValueAccessor(RpPasswordControlComponent),
  ],
  template: `
    <rp-input-control
      [control]="control"
      [errorMessages]="_contentErrors"
      (id)="id = $event"
      [label]="label"
    >
      <input
        #inputControlInput
        [value]="value"
        (input)="onChange($event.target.value)"
        (blur)="onTouch()"
        [placeholder]="placeholder"
        [id]="id"
        type="password"
      >

      <rp-control-error type="required" message="A password is required."></rp-control-error>
    </rp-input-control>
  `,
})
export class RpPasswordControlComponent implements ControlValueAccessor, OnInit, AfterViewInit, OnDestroy {
  @Input() label: string;
  @Input() placeholder = '';
  @Input() formControlName: string;
  @Input() formControl: AbstractControl;

  @ContentChildren(RpControlErrorDirective) contentErrors;

  private onDestroy = new Subject();

  public _contentErrors = new ReplaySubject(1);

  public value = '';

  private form: FormGroup;

  public control: AbstractControl;

  public onTouch = () => {};

  public onChange = (x: any) => {};

  constructor(@Optional() private rpFormGroup: RpFormGroupDirective) {}

  ngOnInit() {
    this.form = this.rpFormGroup ? this.rpFormGroup.form : new FormGroup({});

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
