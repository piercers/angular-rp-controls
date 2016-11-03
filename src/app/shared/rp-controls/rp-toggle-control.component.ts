import {
  Component,
  Input,
  OnInit,
  AfterViewInit,
  OnDestroy,
  ContentChildren,
  Optional,
} from '@angular/core';
import {ControlValueAccessor, AbstractControl, FormControl, FormGroup} from '@angular/forms';
import {Subject} from 'rxjs/Subject';
import {ReplaySubject} from 'rxjs/ReplaySubject';
import 'rxjs/add/operator/startWith';
import 'rxjs/add/operator/takeUntil';

import {RpControlsSettings} from './rp-controls-settings.service';
import {provideValueAccessor} from './util/ng';
import {RpFormGroupDirective} from './rp-form-group.directive';
import {RpControlErrorDirective} from './rp-control-error.directive';

@Component({
  selector: 'rp-toggle-control',
  providers: [
    provideValueAccessor(RpToggleControlComponent),
  ],
  styles: [`
    input {
      display: none;
    }

    .toggle-control__toggle {
      font-size: 2rem;
    }
  `],
  template: `
    <rp-input-control
      [control]="control"
      [errorMessages]="_contentErrors"
      (id)="id = $event"
      [label]="label"
      [inline]="true"
    >
      <input
        #inputControlInput
        [id]="id"
        (change)="check(inputControlInput.checked)"
        type="checkbox"
      >

      <rp-controls-icon
        *ngIf="value"
        (click)="check(false)"
        name="toggle-on"
        [style.color]="color"
        class="toggle-control__toggle toggle-control__toggle--on"
      ></rp-controls-icon>

      <rp-controls-icon
        *ngIf="!value"
        (click)="check(true)"
        name="toggle-off"
        [style.color]="color"
        class="toggle-control__toggle"
      ></rp-controls-icon>
    </rp-input-control>
  `,
})
export class RpToggleControlComponent implements ControlValueAccessor, OnInit, AfterViewInit, OnDestroy {
  @Input() label: string;
  @Input() color = this.settings.colors.primary || 'inherit';
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

  constructor(private settings: RpControlsSettings, @Optional() private rpFormGroup: RpFormGroupDirective) {}

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

  check(checked) {
    this.value = checked;
    this.onChange(checked);
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
