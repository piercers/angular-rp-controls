import {
  Component,
  OnInit,
  AfterViewInit,
  OnDestroy,
  Input,
  ContentChildren,
  forwardRef,
} from '@angular/core';
import {ControlValueAccessor, NG_VALUE_ACCESSOR, AbstractControl, FormBuilder, FormGroup} from '@angular/forms';
import {Subject} from 'rxjs/Subject';
import {ReplaySubject} from 'rxjs/ReplaySubject';
import 'rxjs/add/operator/startWith';
import 'rxjs/add/operator/takeUntil';

import {RpControlErrorDirective} from '../rp-control-error.directive';

/**
 * Component to select days of the week with start and end times
 */
@Component({
  selector: 'rp-hour-control',
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => RpHourControlComponent),
      multi: true,
    },
  ],
  styles: [`
    .hour {
      display: flex;
    }

    .hour > * {
      flex-grow: 1;
    }
  `],
  template: `
    <div [formGroup]="hourForm" class="hour">
      <rp-days-control formControlName="days"></rp-days-control>

      <rp-time-control label="Start" formControlName="start"></rp-time-control>

      <rp-time-control label="End" formControlName="end"></rp-time-control>
    </div>

    <ng-content></ng-content>
  `,
})
export class RpHourControlComponent implements ControlValueAccessor, OnInit, AfterViewInit, OnDestroy {
  @Input() label: string;
  @Input() placeholder = '';
  @Input() formControlName: string;
  @Input() formControl: AbstractControl;

  @ContentChildren(RpControlErrorDirective) contentErrors;

  private onDestroy = new Subject();

  public _contentErrors = new ReplaySubject(1);

  public value = '';

  public control: AbstractControl;

  public hourForm: FormGroup = this._fb.group({
    days: [[]],
    start: [''],
    end: [''],
  });

  public onTouch = () => {};

  public onChange = (x: any) => {};

  constructor(private _fb: FormBuilder) {}

  ngOnInit() {
    this.hourForm.valueChanges
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

  writeValue(value) {
    this.hourForm.patchValue(value || {});
  }

  registerOnChange(fn) {
    this.onChange = fn;
  }

  registerOnTouched(fn) {
    this.onTouch = fn;
  }
}
