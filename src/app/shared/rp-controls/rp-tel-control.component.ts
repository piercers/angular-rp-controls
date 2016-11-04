import {Component, ContentChildren, Input, OnInit, AfterViewInit, OnDestroy, Optional, forwardRef} from '@angular/core';
import {ControlValueAccessor, NG_VALUE_ACCESSOR, FormControl, AbstractControl, FormGroup} from '@angular/forms';
import {Subject} from 'rxjs/Subject';
import {ReplaySubject} from 'rxjs/ReplaySubject';

import {RpControlErrorDirective} from './rp-control-error.directive';
import {RpFormGroupDirective} from './rp-form-group.directive';

@Component({
  selector: 'rp-tel-control',
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => RpTelControlComponent),
      multi: true,
    },
  ],
  template: `
    <rp-input-control
      [control]="control"
      [errorMessages]="contentErrors"
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
        type="tel"
      >
    </rp-input-control>
  `,
})
export class RpTelControlComponent implements ControlValueAccessor, OnInit, AfterViewInit, OnDestroy {
  @Input() label: string;
  @Input() placeholder = '303-555-1234';
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
