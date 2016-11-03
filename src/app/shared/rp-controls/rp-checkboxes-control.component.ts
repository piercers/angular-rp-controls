import {
  Component,
  Input,
  ContentChildren,
  OnInit,
  AfterViewInit,
  OnDestroy,
  Optional,
} from '@angular/core';
import {ControlValueAccessor, AbstractControl, FormGroup, FormControl} from '@angular/forms';
import {castArray, compact} from 'lodash/fp';
import {Subject} from 'rxjs/Subject';
import {ReplaySubject} from 'rxjs/ReplaySubject';
import 'rxjs/add/operator/startWith';
import 'rxjs/add/operator/takeUntil';

import {provideValueAccessor} from './util/ng';
import {RpFormGroupDirective} from './rp-form-group.directive';
import {RpOptionDirective} from './rp-option.directive';
import {RpControlErrorDirective} from './rp-control-error.directive';

@Component({
  selector: 'rp-checkboxes-control',
  providers: [
    provideValueAccessor(RpCheckboxesControlComponent),
  ],
  template: `
    <fieldset class="rp-controls__fieldset">
      <legend *ngIf="label" class="rp-controls__legend">{{label}}</legend>

      <rp-checkbox-control
        *ngFor="let option of options"
        (click)="select(option.value, $event)"
        [checked]="set.has(option.value)"
        [label]="option.label"
        [disabled]="!set.has(option.value) && atLimit"
      ></rp-checkbox-control>
    </fieldset>

    <rp-control-errors
      [errors]="control.errors"
      [messages]="contentErrors"
    ></rp-control-errors>
  `,
})
export class RpCheckboxesControlComponent implements ControlValueAccessor, OnInit, AfterViewInit, OnDestroy {
  @Input() label: string;
  @Input() limit = 0;
  @Input() formControlName: string;
  @Input() formControl: AbstractControl;

  @ContentChildren(RpOptionDirective) options;
  @ContentChildren(RpControlErrorDirective) _contentErrors;

  public set = new Set();

  private onDestroy = new Subject();

  public contentErrors = new ReplaySubject(1);

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
    this._contentErrors.changes
      .takeUntil(this.onDestroy)
      .startWith(this._contentErrors.toArray())
      .subscribe(x => this.contentErrors.next(x));
  }

  ngOnDestroy() {
    this.onDestroy.next();
  }

  get atLimit() {
    return this.limit > 0 && this.set.size === this.limit;
  }

  select(value, event) {
    event.preventDefault(); // For some reason, this function is called twice without this.

    if (this.set.has(value)) {
      this.set.delete(value);
    } else if (!this.atLimit) {
      this.set.add(value);
    }
    this.onChange(Array.from(this.set));
  }

  writeValue(value) {
    this.set.clear(); // Ensure set is empty on init
    compact(castArray(value)) // Convert `value` to an array and remove falsy values
      .forEach(x => this.set.add(x)); // Init set
  }

  registerOnChange(fn) {
    this.onChange = fn;
  }

  registerOnTouched(fn) {
    this.onTouch = fn;
  }
}
