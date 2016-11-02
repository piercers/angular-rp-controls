import {
  Component,
  Input,
  OnInit,
  AfterViewInit,
  OnDestroy,
  ContentChildren,
} from '@angular/core';
import {ControlValueAccessor, FormArray, FormBuilder, AbstractControl} from '@angular/forms';
import {castArray, compact} from 'lodash/fp';
import {Subject} from 'rxjs/Subject';
import {ReplaySubject} from 'rxjs/ReplaySubject';
import 'rxjs/add/operator/startWith';
import 'rxjs/add/operator/takeUntil';

import {provideValueAccessor} from '../util/ng';
import {RpFormGroupDirective} from '../rp-form-group.directive';
import {RpControlErrorDirective} from '../rp-control-error.directive';

@Component({
  selector: 'rp-hours-control',
  providers: [
    provideValueAccessor(RpHoursControlComponent),
  ],
  template: `
    <label *ngIf="label">{{label}}</label>

    <rp-hour-control *ngFor="let control of hoursForm.controls; let index = index" [formControl]="control">
      <button
        *ngIf="hoursForm.controls.length > 1"
        (click)="removeAt(index)"
        class="btn btn--less hour__remove"
        type="button"
      >Remove</button>
    </rp-hour-control>

    <button (click)="add()" class="btn btn--less" type="button">Add</button>
  `,
})
export class RpHoursControlComponent implements ControlValueAccessor, OnInit, AfterViewInit, OnDestroy {
  @Input() label: string;
  @Input() formControlName: string;
  @Input() formControl: AbstractControl;

  @ContentChildren(RpControlErrorDirective) contentErrors;

  public hoursForm: FormArray = this._fb.array([]);

  private onDestroy = new Subject();

  public _contentErrors = new ReplaySubject(1);

  public value = '';

  public onTouch = () => {};

  public onChange = (x: any) => {};

  constructor(private _fb: FormBuilder, private rpFormGroup: RpFormGroupDirective) {}

  ngOnInit() {
    if (!this.hoursForm.controls.length) this.add(); // Ensure there's at least one item in there

    this.hoursForm.valueChanges
      .takeUntil(this.onDestroy)
      .subscribe(x => this.onChange(x));
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

  add() {
    this.hoursForm.push(this._fb.control({}));
  }

  removeAt(index) {
    this.hoursForm.removeAt(index);
  }

  writeValue(value) {
    compact(castArray(value))
      .map(x => this._fb.control(x))
      .forEach(x => this.hoursForm.push(x));
  }

  registerOnChange(fn) {
    this.onChange = fn;
  }

  registerOnTouched(fn) {
    this.onTouch = fn;
  }
}
