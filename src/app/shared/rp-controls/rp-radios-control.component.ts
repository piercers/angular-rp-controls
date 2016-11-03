import {
  Component,
  ContentChildren,
  Input,
  AfterViewInit,
  OnDestroy,
} from '@angular/core';
import {ControlValueAccessor, AbstractControl} from '@angular/forms';
import {Subject} from 'rxjs/Subject';
import {ReplaySubject} from 'rxjs/ReplaySubject';
import 'rxjs/add/operator/startWith';
import 'rxjs/add/operator/takeUntil';

import {provideValueAccessor} from './util/ng';
import {RpControlErrorDirective} from './rp-control-error.directive';
import {RpOptionDirective} from './rp-option.directive';

@Component({
  selector: 'rp-radios-control',
  providers: [
    provideValueAccessor(RpRadiosControlComponent),
  ],
  template: `
    <fieldset class="rp-controls__fieldset">
      <legend *ngIf="label" class="rp-controls__legend">{{label}}</legend>

      <rp-radio-control
        *ngFor="let option of options"
        (click)="select(option.value)"
        [checked]="option.value === value"
        [label]="option.label"
        [value]="option.value"
      ></rp-radio-control>
    </fieldset>
  `,
})
export class RpRadiosControlComponent implements ControlValueAccessor, AfterViewInit, OnDestroy {
  @Input() label: string;
  @Input() formControlName: string;
  @Input() formControl: AbstractControl;

  @ContentChildren(RpOptionDirective) options;
  @ContentChildren(RpControlErrorDirective) contentErrors;

  private onDestroy = new Subject();

  public _contentErrors = new ReplaySubject(1);

  public value = '';

  public onTouch = () => {};

  public onChange = (x: any) => {};

  ngAfterViewInit() {
    this.contentErrors.changes
      .startWith(this.contentErrors)
      .takeUntil(this.onDestroy)
      .subscribe(x => this._contentErrors.next(x.toArray()));
  }

  ngOnDestroy() {
    this.onDestroy.next();
  }

  select(value) {
    this.writeValue(value);
    this.onChange(value);
    this.onTouch();
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
