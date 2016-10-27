import './checkboxes-control.css!';

import {Component, EventEmitter, ContentChildren, ChangeDetectorRef} from '@angular/core';
import {FormControl} from '@angular/forms';
import castArray from 'lodash/fp/castArray';
import compact from 'lodash/fp/compact';
import {BehaviorSubject} from 'rxjs/BehaviorSubject';
import 'rxjs/add/operator/startWith';

import Options from './checkboxes-option.component';

@Component({
  selector: 'checkboxes-control',
  inputs: [
    'control',
    'model',
    'limit',
    'single',
  ],
  outputs: ['modelChange'],
  queries: {
    options: new ContentChildren(Options),
  },
  host: {
    '[class.at-limit]': 'selected.size == limit',
  },
  template: `
    <checkboxes-option
      *ngFor="let option of options"
      [value]="option.value"
      [label]="option.label"
      [selected]="selected.has(option.value)"
      [disabled]="selected.size == limit && !selected.has(option.value)"
      (check)="check(option.value, $event)"
      [view]="option.view"
      [hideIcon]="single"
    ></checkboxes-option>
  `,
  changeDetection: 'onPush',
})
export default class CheckboxesControlComponent {
  constructor(_ref) {
    Object.assign(this, {
      _ref,
      modelChange: new EventEmitter(),
      control: new FormControl(),
      options$: new BehaviorSubject(),
    });
  }

  ngOnInit() {
    const {value} = this.control;
    this.subs = this.control.valueChanges
      .startWith(value || this.model || [])
      .subscribe((selected = []) => {
        this.selected = new Set(compact(castArray(selected))); // Update selected based on control value updates
        this._ref.markForCheck(); // Change comes from outside component; trigger change detection manually
      });
  }

  ngAfterViewInit() {
    // FIXME Without adding invalid options, you can't make a selection to clear out the invalid answer
    // - Had to comment out because options wouldn't show up after initial load on <app-panel>s.
    // const options = this.options.toArray(); // Passed in options
    //
    // /**
    //  * Array of selected values that don't have a given option
    //  */
    // this.invalid = [...this.selected]
    //   .reduce((invalid, value) => {
    //     const hasValue = options.some(option => option.value === value);
    //     return hasValue ? invalid : invalid.concat(value);
    //   }, [])
    //   .map(value => ({
    //     label: value,
    //     value,
    //   }));
    //
    // this.options$.next(options.concat(...this.invalid)); // Push any invalid values to options
  }

  ngOnDestroy() {
    this.subs.unsubscribe();
  }

  check(value, checked) {
    checked ? this.selected.add(value) : this.selected.delete(value);
    const arr = [...this.selected];
    this.control.patchValue(this.single ? arr[0] : arr); // Update control with latest values
  }
}

CheckboxesControlComponent.parameters = [ChangeDetectorRef];
