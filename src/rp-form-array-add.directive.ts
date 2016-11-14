import {Directive, HostListener, Input, Optional, OnInit} from '@angular/core';
import {
  FormArrayName,
  FormControl,
  FormGroup,
  FormArray,
  AbstractControl,
} from '@angular/forms';
import {
  assign,
  entries,
  flow,
  get,
  head,
  mapValues,
  reduce,
} from 'lodash/fp';

const firstControl = flow(get('controls'), head);

/**
 * Create a FormGroup config from an existing FormGroup
 * @param  {FormGroup} control Exisiting FormGroup instance
 * @return {Object}            Control config object to be used in `FormBuilder.group(config)`
 */
const groupConfig = flow(
  get('controls'),
  entries,
  reduce((config = {}, [name, control]) => assign(config, {
    [name]: [undefined, control.validator],
  }), {})
);

/**
 * Creates a FormGroup from a config without the need of FormBuilder
 * @param  {object} config FormGroup config object
 * @return {FormGroup}     A configured FormGroup
 */
const configToGroup = flow(
  mapValues(([value, validator]) => new FormControl(value, validator)), // Take each config and turn it into a FormControl
  config => new FormGroup(config) // Config -> FormGroup
);

// - Could also handle initialization of the array
//   - But should it?
//   - Does this control start with one empty control if none exisiting?
//   - If all are removed, is an empty one inserted?
// - `<rp-form-array label="Array Control" [formArray]="arrayControl" [intialize]="true"></rp-form-array>`
@Directive({selector: '[rpFormArrayAdd]'})
export class RpFormArrayAddDirective implements OnInit {
  @Input() rpFormArrayAdd: FormArray;

  private array: FormArray;

  private config: AbstractControl;

  constructor(@Optional() private formArray: FormArrayName) {}

  ngOnInit() {
    this.array = this.rpFormArrayAdd || this.formArray.control; // TODO What if a parent formArray isn't given? Error?

    const first = firstControl(this.array);

    const isGroup = first instanceof FormGroup; // Whether FormArray contains a FormGroup or not

    this.config = isGroup ? groupConfig(first) : undefined; // Store FormGroup config so new controls can be added
  }

  @HostListener('click')
  addControl() {
    this.array.push(this.config ? configToGroup(this.config) : new FormControl());
  }
}
