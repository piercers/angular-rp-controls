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
  mapValues(x => new FormControl(...x)), // Take each config and turn it into a FormControl
  config => new FormGroup(config) // Config -> FormGroup
);

// TODO Currenly, this directive is only barely useful
// - Maybe it handles array label too?
//   - This is something that would be often styled the same for this use case
// - Could also handle initialization of the array
//   - But should it?
//   - Does this control start with one empty control if none exisiting?
//   - If all are removed, is an empty one inserted?
// TODO Naming: rpFormArray...
// - Add, Section, Header, Title, Label
// TODO Should it add styling to rp-form-array-label and functionality to [rpFormArrayAdd]?
// - Can't decide if this is needed or helpful
//   - If you just need the functionality, write a method to that component?
// - Could replace having to do `<div formArrayName="arrayControl">`
//   - I think this is needed in order to do `<rp-text-control [formControlName]="i"></rp-text-control>`
//   - `<rp-form-array label="Array Control" [formArray]="arrayControl" [intialize]="true"></rp-form-array>`
// - Have the directive to the heavylifting, then a component that extends this.
@Directive({selector: '[rpFormArrayAdd]'})
export class RpFormArrayAddDirective implements OnInit {
  @Input() rpFormArrayLabel: FormArray;

  private array: FormArray;

  private config: AbstractControl;

  constructor(@Optional() private formArray: FormArrayName) {}

  ngOnInit() {
    this.array = this.rpFormArrayLabel || this.formArray.control; // TODO What if a parent formArray isn't given? Error?

    const first = firstControl(this.array);

    const isGroup = first instanceof FormGroup; // Whether FormArray contains a FormGroup or not

    this.config = isGroup ? groupConfig(first) : undefined; // Store FormGroup config so new controls can be added
  }

  @HostListener('click')
  addControl() {
    this.array.push(this.config ? configToGroup(this.config) : new FormControl());
  }
}
