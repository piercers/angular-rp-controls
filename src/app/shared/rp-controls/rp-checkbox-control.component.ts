import {
  Component,
  Input,
  SimpleChanges,
  OnChanges,
  OnInit,
  AfterViewInit,
  OnDestroy,
  ContentChildren,
  HostBinding,
} from '@angular/core';
import {ControlValueAccessor, AbstractControl, FormGroup, FormControl} from '@angular/forms';
import {Subject} from 'rxjs/Subject';
import {ReplaySubject} from 'rxjs/ReplaySubject';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/startWith';
import 'rxjs/add/operator/takeUntil';

import {provideValueAccessor} from './util/ng';
import {RpFormGroupDirective} from './rp-form-group.directive';
import {RpControlErrorDirective} from './rp-control-error.directive';
import {RpControlsSettings} from './rp-controls-settings.service';

@Component({
  selector: 'rp-checkbox-control',
  providers: [
    provideValueAccessor(RpCheckboxControlComponent),
  ],
  styles: [`
    :host {
      display: block;
      margin-top: .2rem;
      font-weight: normal;
    }

    :host.is-checked {
      font-weight: bold;
    }

    :host.is-disabled,
    :host.is-disabled .checkbox {
      opacity: .6;
    }

    .is-hidden {
      display: none;
    }

    input {
      display: none;
    }

    .checkbox {
      position: relative;
      width: 1.33rem;
      height: 1.33rem;
      margin-left: .5rem;
      cursor: pointer;
      border-radius: 3px;
    }

    .checkmark {
      position: absolute;
      transform: translateY(-50%) rotate(45deg);
      top: 50%;
      left: 0;
      right: 0;
      text-align: center;
      font-size: 0rem;
      opacity: 0;
      color: white;
      transition: all .2s ease-out;
    }

    .checkmark.is-checked {
      opacity: 1;
      transform: translateY(-50%) rotate(0deg);
      font-size: 1rem;
    }
  `],
  template: `
    <rp-input-control
      [control]="control"
      [label]="label"
      (id)="id = $event"
      [inline]="true"
      (labelClick)="check()"
    >
      <input
        [formControl]="control"
        [id]="id"
        type="checkbox"
      >

      <span
        (click)="check()"
        [class.is-hidden]="hideCheckbox"
        [style.background-color]="color"
        class="checkbox"
      >
        <rp-controls-icon
          name="check"
          [class.is-checked]="checked"
          class="checkmark"
        ></rp-controls-icon>
      </span>
    </rp-input-control>
  `,
})
export class RpCheckboxControlComponent implements ControlValueAccessor, OnChanges, OnInit, AfterViewInit, OnDestroy {
  @Input() label: string;
  @Input() @HostBinding('class.is-disabled') disabled = false;
  @Input() @HostBinding('class.is-checked') checked = false;
  @Input() hideCheckbox = false;
  @Input() color = this.settings.colors.primary || 'black';
  @Input() formControlName: string;
  @Input() formControl: AbstractControl;

  @ContentChildren(RpControlErrorDirective) contentErrors;

  private onDestroy = new Subject();

  public _contentErrors = new ReplaySubject(1);

  public value = '';

  private form: FormGroup;

  public control: AbstractControl;

  public onTouch = () => {};

  public onChange = (x: any) => {}

  constructor(private rpFormGroup: RpFormGroupDirective, private settings: RpControlsSettings) {}

  ngOnChanges({disabled}: SimpleChanges) {
    if (disabled) this.disable(disabled.currentValue);
  }

  ngOnInit() {
    this.form = this.rpFormGroup.form;

    this.control = this.formControl || this.form.get(this.formControlName) || new FormControl();

    this.disable(this.disabled);
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

  disable(isDisabled) {
    if (this.control) {
      if (isDisabled === false) this.control.enable();
      if (isDisabled === true) this.control.disable();
    }
  }

  check() {
    if (!this.disabled) {
      this.checked = !this.checked;
      this.onChange(this.checked);
    }
  }

  writeValue(value) {
    this.checked = value;
  }

  registerOnChange(fn) {
    this.onChange = fn;
  }

  registerOnTouched(fn) {
    this.onTouch = fn;
  }
}
