import {
  Component,
  Input,
  SimpleChanges,
  OnChanges,
  OnInit,
  OnDestroy,
  forwardRef,
} from '@angular/core';
import {
  FormBuilder,
  Validators,
  ControlValueAccessor,
  AbstractControl,
  NG_VALUE_ACCESSOR,
  FormGroup,
} from '@angular/forms';
import {entries, isObject} from 'lodash/fp';
import {Subject} from 'rxjs/Subject';
import 'rxjs/add/operator/takeUntil';

@Component({
  selector: 'rp-duration-control',
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => RpDurationControlComponent),
      multi: true,
    },
  ],
  styles: [`
    .duration {
      display: flex;
      flex-wrap: wrap;
    }

    .duration > * {
      flex-grow: 1;
    }

    label {
      flex-basis: 100%;
    }
  `],
  template: `
    <div [formGroup]="durationForm" class="duration">
      <label *ngIf="label">{{label}}</label>

      <rp-number-control label="Amount" formControlName="amount"></rp-number-control>

      <rp-select-control label="Units" formControlName="units">
        <rp-option *ngFor="let unit of units" [label]="unit[1]" [value]="unit[0]"></rp-option>
      </rp-select-control>
    </div>
  `,
})
export class RpDurationControlComponent implements ControlValueAccessor, OnChanges, OnInit, OnDestroy {
  @Input() label: string;
  @Input() units = {}; // TODO More helpful error if units aren't passed
  @Input() min; // TODO Implement (Need on number-control)
  @Input() max; // TODO Implement (Need on number-control)
  @Input() formControlName: string;
  @Input() formControl: AbstractControl;

  private onDestroy = new Subject();

  public value = {};

  public durationForm: FormGroup = this._fb.group({
    amount: ['', Validators.required],
    units: ['', Validators.compose([
      Validators.required,
      // Validators.min(0), // TODO Implement min="0" validator
    ])],
  });

  public onTouch = () => {};

  public onChange = (x: any) => {};

  constructor(private _fb: FormBuilder) {}

  ngOnChanges({units}: SimpleChanges) {
    if (units) this.units = entries(units.currentValue);
  }

  ngOnInit() {
    this.durationForm.valueChanges
      .takeUntil(this.onDestroy)
      .subscribe(x => this.onChange(x));
  }

  ngOnDestroy() {
    this.onDestroy.next();
  }

  writeValue(value = {}) {
    if (isObject(value)) {
      this.durationForm.patchValue(value);
    }
  }

  registerOnChange(fn) {
    this.onChange = fn;
  }

  registerOnTouched(fn) {
    this.onTouch = fn;
  }
}
