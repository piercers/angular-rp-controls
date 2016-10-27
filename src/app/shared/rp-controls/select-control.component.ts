import {
  Component,
  Input,
  Output,
  ChangeDetectionStrategy,
  ContentChildren,
  EventEmitter,
  OnChanges,
  OnInit,
  AfterViewInit,
  OnDestroy,
  SimpleChanges,
} from '@angular/core';
import {FormControl} from '@angular/forms';
import {castArray, compact, filter, flow, get, isUndefined, map} from 'lodash/fp';
import {ReplaySubject} from 'rxjs/ReplaySubject';
import {Subscription} from 'rxjs/Subscription';
import 'rxjs/add/operator/do';
import 'rxjs/add/operator/startWith';

import {BoolToggle} from './util/rxjs';
import {SelectOptionDirective} from './select-option.directive';
import {ControlErrorDirective} from './control-error.directive';

@Component({
  selector: 'select-control',
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

    <input-control
      [control]="control"
      [label]="label"
      (id)="id = $event"
      (labelClick)="isMenuOpen.next()"
      [active]="isMenuOpen.$|async"
      [errorMessages]="contentErrors|async"
    >
      <button (click)="isMenuOpen.next()" class="rp-controls__input-control__input select-control__select" type="button">
      <span *ngIf="hasValue || (!hasValue && !label)">{{selected || placeholder}}</span>

        <span class="select-control__select-icon">▾</span>
      </button>

      <div *ngIf="isMenuOpen.$|async" class="select-control__menu">
        <button *ngIf="isSingleSelect && canResetSingle" (click)="select()" type="button">{{placeholder}}</button>

        <checkbox-control
          *ngFor="let option of options"
          [checked]="isSelected(option.value)"
          (checkedChange)="select(option.value)"
          [label]="option.label"
          [disabled]="!isSelected(option.value) && atLimit"
          [hideCheckbox]="isSingleSelect"
          [hideErrors]="true"
          class="select-control__option"
        ></checkbox-control>

        <div *ngIf="!options.length">No options given.</div>
      </div>

      <control-error type="minlength" message="Select control needs more."></control-error>
    </input-control>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SelectControlComponent implements OnChanges, OnInit, AfterViewInit, OnDestroy {
  @Input() label: string;
  @Input() control = new FormControl();
  @Input() placeholder = 'Select...';
  @Input() canResetSingle = false;
  @Input() limit: number;
  @Input() model;
  @Output() modelChange = new EventEmitter();
  @ContentChildren(SelectOptionDirective) options;
  @ContentChildren(ControlErrorDirective) _contentErrors;

  private set = new Set();
  private subs: Subscription;
  private subs2: Subscription;
  private _contentErrorsSub: Subscription;
  private isMenuOpen: any = BoolToggle();
  private isSingleSelect = true;
  private contentErrors = new ReplaySubject(1);

  ngOnChanges({limit}: SimpleChanges) {
    if (limit) {
      const {currentValue = 1} = limit; // Component defaults to single select
      this.isSingleSelect = currentValue === 1;
    }
  }

  ngOnInit() {
    this.control = this.control || new FormControl(this.model);

    castArray(this.control.value).forEach(x => this.set.add(x)); // Init set

    this.subs2 = this.control.valueChanges
      .subscribe(x => this.modelChange.emit(x));

    let lastWasTrue = false; // TODO Use `.scan()`

    this.subs = this.isMenuOpen.$
      .do(x => {
        if (lastWasTrue) this.control.markAsTouched();
        lastWasTrue = x;
      })
      .subscribe();
  }

  ngAfterViewInit() {
    this._contentErrorsSub = this._contentErrors.changes
      .startWith(this._contentErrors.toArray())
      .subscribe(x => this.contentErrors.next(x));
  }

  ngOnDestroy() {
    this.subs.unsubscribe();
    this.subs2.unsubscribe();
    this._contentErrorsSub.unsubscribe();
  }

  get selected() {
    const options = this.options.toArray();
    const selectedValues = castArray(this.control.value); // Cast value to an array
    const selectedLabels = flow(
      filter(({value}) => selectedValues.includes(value)),
      compact,
      map(get('label'))
    )(options);

    return selectedLabels.join(', ');
  }

  get atLimit() {
    const hasLimit = this.limit !== 0;
    const atLimit = castArray(this.control.value || '').length === this.limit;

    return hasLimit && atLimit;
  }

  get hasValue(): boolean {
    return compact(castArray(this.control.value)).length > 0; // TODO Seems unneccessary
  }

  isSelected(value) {
    const multipleSelect = this.set.has(value);
    const singleSelect = this.control.value === value;

    return isUndefined(this.limit) ? singleSelect : multipleSelect;
  }

  select(value) {
    if (this.isSingleSelect) { // Single select
      this.control.patchValue(value);
      this.isMenuOpen.next(); // Close menu
    } else { // Multiple select
      if (this.set.has(value)) {
        this.set.delete(value);
      } else {
        if (!this.atLimit) { // Only add value if not at limit
          this.set.add(value);
        }
      }
      this.control.patchValue(Array.from(this.set.values()));
    }
  }
}
