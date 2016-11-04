import {
  Component,
  Input,
  ContentChildren,
  OnChanges,
  OnInit,
  AfterViewInit,
  OnDestroy,
  SimpleChanges,
  Optional,
  forwardRef,
} from '@angular/core';
import {ControlValueAccessor, NG_VALUE_ACCESSOR, AbstractControl, FormGroup, FormControl} from '@angular/forms';
import {castArray, compact, filter, flow, get, includes, map} from 'lodash/fp';
import {Subject} from 'rxjs/Subject';
import {ReplaySubject} from 'rxjs/ReplaySubject';
import 'rxjs/add/operator/takeUntil';
import 'rxjs/add/operator/startWith';

import {BoolToggle} from './util/rxjs';
import {RpFormGroupDirective} from './rp-form-group.directive';
import {RpControlErrorDirective} from './rp-control-error.directive';
import {RpOptionDirective} from './rp-option.directive';

// TODO Use <rp-checkboxes-control> and <rp-radios-control>?
@Component({
  selector: 'rp-select-control',
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => RpSelectControlComponent),
      multi: true,
    },
  ],
  styles: [`
    :host {
      position: relative;
    }

    .select-control__select {
      width: 100%;
      text-align: left;
    }

    .select-control__select-icon {
      float: right;
    }

    .select-control__menu {
      position: absolute;
      top: .5rem;
      left: -.5rem;
      min-width: 150px;
      z-index: 100;
      color: black;
      background: white;
      border: 1px solid #eee;
      padding-left: .7rem;
      padding-right: .7rem;
    }

    .select-control__menu > * {
      margin: 0;
      padding-top: .5rem;
      padding-bottom: .5rem;
    }
  `],
  template: `
    <rp-controls-overlay [open]="isMenuOpen.$|async" (click)="isMenuOpen.next()" opacity="0"></rp-controls-overlay>

    <rp-input-control
      [control]="control"
      [label]="label"
      (id)="id = $event"
      (labelClick)="isMenuOpen.next()"
      [active]="isMenuOpen.$|async"
      [errorMessages]="contentErrors"
    >
      <button (click)="onTouch(); isMenuOpen.next()" class="rp-controls__input-control__input select-control__select" type="button">
        <span *ngIf="!hasValue && !label">{{placeholder}}</span>

        <span *ngIf="hasValue">{{selectedLabels}}</span>

        <span class="select-control__select-icon">▾</span>
      </button>

      <div *ngIf="isMenuOpen.$|async" class="select-control__menu">
        <button *ngIf="isSingleSelect && canResetSingle" (click)="select()" type="button">{{placeholder}}</button>

        <rp-checkbox-control
          *ngFor="let option of options"
          [checked]="set.has(option.value)"
          (click)="select(option.value, $event)"
          [label]="option.label"
          [disabled]="!isSingleSelect && !set.has(option.value) && atLimit"
          [hideCheckbox]="isSingleSelect"
          class="select-control__option"
        ></rp-checkbox-control>

        <div *ngIf="!options.length">No options given.</div>
      </div>

      <rp-control-error type="minlength" message="Select control needs more."></rp-control-error>
    </rp-input-control>
  `,
})
export class RpSelectControlComponent implements ControlValueAccessor, OnChanges, OnInit, AfterViewInit, OnDestroy {
  @Input() label: string;
  @Input() placeholder = 'Select...';
  @Input() canResetSingle = false;
  @Input() limit = 1; // Component defaults to single select
  @Input() formControlName: string;
  @Input() formControl: AbstractControl;

  @ContentChildren(RpOptionDirective) options;
  @ContentChildren(RpControlErrorDirective) _contentErrors;

  public set = new Set();

  private onDestroy = new Subject();

  private isMenuOpen: any = BoolToggle();

  private isSingleSelect = true;

  private contentErrors = new ReplaySubject(1);

  private form: FormGroup;

  public control: AbstractControl;

  public onTouch = () => {};

  public onChange = (x: any) => {};

  constructor(@Optional() private rpFormGroup: RpFormGroupDirective) {}

  ngOnChanges({limit}: SimpleChanges) {
    if (limit) {
      const {currentValue = 1} = limit;
      this.isSingleSelect = currentValue === 1;
    }
  }

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

  /**
   * Returns a string of all selected labels
   */
  get selectedLabels(): string {
    const options = this.options.toArray();
    const selectedValues = Array.from(this.set);
    const selectedLabels = flow(
      filter(({value}) => includes(value, selectedValues)),
      compact,
      map(get('label'))
    )(options);

    return selectedLabels.join(', ');
  }

  get atLimit(): boolean {
    const hasLimit = this.limit !== 0;
    const atLimit = this.set.size === this.limit;
    return hasLimit && atLimit;
  }

  get hasValue(): boolean {
    return this.set.size > 0;
  }

  select(value, event) {
    event.preventDefault(); // For some reason, this function is called twice without this.

    if (this.isSingleSelect) {
      this.set.clear();
      this.set.add(value);
      this.onChange(value);
      this.isMenuOpen.next(); // Close menu
    } else { // Multiple Select
      if (this.set.has(value)) {
        this.set.delete(value);
      } else if (!this.atLimit) {
        this.set.add(value);
      }
      this.onChange(Array.from(this.set));
    }
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
