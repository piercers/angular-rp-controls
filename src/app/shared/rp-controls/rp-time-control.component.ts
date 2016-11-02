import {
  Component,
  Input,
  OnInit,
  AfterViewInit,
  OnDestroy,
  ContentChildren,
} from '@angular/core';
import {FormControl, ControlValueAccessor, AbstractControl, FormGroup} from '@angular/forms';
import {Observable} from 'rxjs/Observable';
import {Subject} from 'rxjs/Subject';
import {ReplaySubject} from 'rxjs/ReplaySubject';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/startWith';
import 'rxjs/add/operator/takeUntil';

import {notEmpty} from './util/lodash';
import {provideValueAccessor} from './util/ng';
import {RpFormGroupDirective} from './rp-form-group.directive';
import {RpControlErrorDirective} from './rp-control-error.directive'

@Component({
  selector: 'rp-time-control',
  providers: [
    provideValueAccessor(RpTimeControlComponent),
  ],
  styles: [`
    input:not(.show-placeholder):not(.has-value) {
      color: transparent;
    }
  `],
  template: `
    <rp-input-control
      [control]="control"
      [label]="label"
      (id)="id = $event"
      [errorMessages]="_contentErrors"
    >
      <input
        #inputControlInput
        [value]="value"
        (input)="onChange($event.target.value)"
        [placeholder]="placeholder"
        [id]="id"
        [class.show-placeholder]="showPlaceholder"
        [class.has-value]="hasValue|async"
        (focus)="showPlaceholder = true"
        (blur)="onTouch(); showPlaceholder = false"
        type="time"
      >
    </rp-input-control>
  `,
})
export class RpTimeControlComponent implements ControlValueAccessor, OnInit, AfterViewInit, OnDestroy {
  @Input() label: string;
  @Input() placeholder = '12:34 PM';
  @Input() formControlName: string;
  @Input() formControl: AbstractControl;

  @ContentChildren(RpControlErrorDirective) contentErrors;

  private onDestroy = new Subject();

  public _contentErrors = new ReplaySubject(1);

  public value = '';

  private form: FormGroup;

  public control: AbstractControl;

  public hasValue: Observable<any>;

  public onTouch = () => {};

  public onChange = (x: any) => {};

  constructor(private rpFormGroup: RpFormGroupDirective) {}

  ngOnInit() {
    this.form = this.rpFormGroup.form;

    this.control = this.formControl || this.form.get(this.formControlName) || new FormControl();

    this.hasValue = this.control.valueChanges
      .startWith(this.control.value)
      .map(notEmpty);
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
