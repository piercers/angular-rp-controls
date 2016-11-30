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
import {castArray, compact, flow, get, isObjectLike, join, map} from 'lodash/fp';
import {Subject} from 'rxjs/Subject';
import {ReplaySubject} from 'rxjs/ReplaySubject';
import 'rxjs/add/operator/takeUntil';
import 'rxjs/add/operator/startWith';

import {BoolToggle} from './util/rxjs';
import {RpFormGroupDirective} from './rp-form-group.directive';
import {RpControlErrorDirective} from './rp-control-error.directive';
import {RpOptionDirective} from './rp-option.directive';

const handleTrackBy = (options, trackBy, value) => {
  if (!isObjectLike(value)) {
    throw new Error('Input `trackBy` can only be used with object values.');
  }
  const getTrackBy = get(trackBy);
  return options.find(option => getTrackBy(option.value) === getTrackBy(value));
};

const findMatchingOption = (options, trackBy, value) => {
  return trackBy ? handleTrackBy(options, trackBy, value) : options.find(option => option.value === value);
};

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
          [checked]="map.has(key(option.value))"
          (click)="select(option.value, $event)"
          [label]="option.label"
          [disabled]="!isSingleSelect && !map.has(key(option.value)) && atLimit"
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
  @Input() trackBy: string;
  @Input() formControlName: string;
  @Input() formControl: AbstractControl;

  @ContentChildren(RpOptionDirective) options;
  @ContentChildren(RpControlErrorDirective) _contentErrors;

  public map = new Map();

  private onDestroy = new Subject();

  public isMenuOpen: any = BoolToggle();

  public isSingleSelect = true;

  public contentErrors = new ReplaySubject(1);

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
    return flow( // given selected
      map(value => this.findMatchingOption(value)), // Match values to labels in options
      map(get('label')), // Get each maching label
      join(', ') // Convert to comma-separated string
    )(Array.from(this.map.values()));
  }

  get atLimit(): boolean {
    const hasLimit = this.limit !== 0;
    const atLimit = this.map.size === this.limit;
    return hasLimit && atLimit;
  }

  get hasValue(): boolean {
    return this.map.size > 0;
  }

  findMatchingOption(value) {
    return findMatchingOption(this.options.toArray(), this.trackBy, value);
  }

  key(value) {
    return this.trackBy ? get(this.trackBy, value) : value;
  }

  select(value, event) {
    event.preventDefault(); // For some reason, this function is called twice without this.

    if (this.isSingleSelect) {
      this.map.clear();
      this.map.set(this.key(value), value);
      this.onChange(value);
      this.isMenuOpen.next(); // Close menu
    } else { // Multiple Select
      if (this.map.has(this.key(value))) {
        this.map.delete(this.key(value));
      } else if (!this.atLimit) {
        this.map.set(this.key(value), value);
      }
      this.onChange(Array.from(this.map.values()));
    }
  }

  writeValue(value) {
    this.map.clear(); // Ensure set is empty on init
    compact(castArray(value)) // Convert `value` to an array and remove falsy values
      .forEach(x => this.map.set(this.key(x), x)); // Init set
  }

  registerOnChange(fn) {
    this.onChange = fn;
  }

  registerOnTouched(fn) {
    this.onTouch = fn;
  }
}
