import {
  Component,
  Input,
  ContentChild,
  Renderer,
  ViewEncapsulation,
  ElementRef,
  HostBinding,
  Optional,
  OnInit,
  AfterContentInit,
  SkipSelf,
  Output,
  EventEmitter,
  OnChanges,
  SimpleChanges,
  ChangeDetectorRef,
} from '@angular/core';
import {FormControl, FormControlName} from '@angular/forms';
import {
  castArray,
  compact,
  concat,
  defaultTo,
  flatten,
  flow,
  forEach,
  isBoolean,
  isEmpty,
  isNumber,
  map,
  negate,
  overSome,
  uniqueId,
  size,
} from 'lodash/fp';
import {Observable} from 'rxjs/Observable';
import {BehaviorSubject} from 'rxjs/BehaviorSubject';
import {ReplaySubject} from 'rxjs/ReplaySubject';
import 'rxjs/add/operator/do';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/startWith';

import {RpControlsSettingsService} from './rp-controls-settings.service';
import {RpFormGroupDirective} from './rp-form-group.directive';

// TODO Scope ::placeholder selectors to be children of rp-control
// TODO Should '.is-disabled' be part of this?
// - Probably - all fields can be disabled
@Component({
  selector: 'rp-control',
  styles: [`
    /* Bare minimum / Reset */
    html {
      box-sizing: border-box;
    }

    *, *:before, *:after {
      box-sizing: inherit;
    }

    fieldset {
      margin: 0;
      padding: 0;
      border: 0;
    }

    /* Placeholders */
    .rp-control--default ::placeholder {
      color: #d6d6d6;
    }
    .rp-control--default ::-webkit-input-placeholder { /* WebKit, Blink, Edge */
      color: #d6d6d6;
    }
    .rp-control--default :-moz-placeholder { /* Mozilla Firefox 4 to 18 */
      color: #d6d6d6;
    }
    .rp-control--default ::-moz-placeholder { /* Mozilla Firefox 19+ */
      color: #d6d6d6;
    }
    .rp-control--default :-ms-input-placeholder { /* Internet Explorer 10-11 */
      color: #d6d6d6;
    }
    .rp-control--default ::-webkit-datetime-edit-fields-wrapper {
      color: #d6d6d6;
    }

    /* Dropdown */
    .dropdown label {
      display: block;
      white-space: nowrap;
    }
    .dropdown rp-checkbox-control {
      display: block;
    }

    /**
     * Default Theme
     */
    .rp-control--default {
      position: relative;
      display: block;
    }
    .rp-control--default:not(.is-nested) {
      padding-top: .33rem;
      padding-bottom: .33rem;
    }

    .rp-control--default .rp-control__input-container {
      position: relative;
    }
    .rp-control--default:not(.is-inline):not(.is-nested) > .rp-control__input-container::after {
      content: '';
      display: block;
      position: absolute;
      bottom: .2rem;
      right: .33rem;
      left: .33rem;
      height: 1px;
      background-color: #d6d6d6;
      transition: all .2s ease-out;
    }
    .rp-control--default.has-focus:not(.is-inline):not(.is-nested) > .rp-control__input-container::after {
      height: 2px;
      background-color: #F28525;
    }

    .rp-control--default .rp-control__input,
    .rp-control--default .rp-control__select-btn {
      font-size: 1rem;
      font-family: inherit;
      margin: 0 0 .2rem;
      padding: .33rem;
      border: 0;
      border-radius: 3px;
      background: transparent;
      outline: none;
    }

    /* Placeholders */
    .rp-control--default.has-label .rp-control__placeholder {
      opacity: 0;
    }
    .rp-control--default.has-label ::placeholder {
      opacity: 0;
    }
    .rp-control--default.has-label ::-webkit-input-placeholder {
      opacity: 0;
    }
    .rp-control--default.has-label :-moz-placeholder {
      opacity: 0;
    }
    .rp-control--default.has-label ::-moz-placeholder {
      opacity: 0;
    }
    .rp-control--default.has-label :-ms-input-placeholder {
      opacity: 0;
    }
    .rp-control--default.has-label:not(.has-focus):not(.has-value) ::-webkit-datetime-edit-fields-wrapper { /* This class also handles value dislplay so change accordingly */
      opacity: 0;
    }
    .rp-control--default.has-value ::-webkit-datetime-edit-fields-wrapper {
      color: #666;
    }
    .rp-control--default.has-focus .rp-control__placeholder {
      opacity: 1;
    }
    .rp-control--default.has-focus ::placeholder {
      opacity: 1;
    }
    .rp-control--default.has-focus ::-webkit-input-placeholder {
      opacity: 1;
    }
    .rp-control--default.has-focus :-moz-placeholder {
      opacity: 1;
    }
    .rp-control--default.has-focus ::-moz-placeholder {
      opacity: 1;
    }
    .rp-control--default.has-focus :-ms-input-placeholder {
      opacity: 1;
    }
    .rp-control--default.has-focus ::-webkit-datetime-edit-fields-wrapper {
      opacity: 1;
    }

    /* Labels */
    .rp-control--default:not(.is-nested) > .rp-control__label,
    .rp-control--default:not(.is-nested) legend {
      display: block;
      position: relative;
      top: 0;
      left: .33rem;
      height: 1.2rem;
      transition: all .2s ease-out;
      cursor: pointer;
    }
    .rp-control--default:not(.is-nested) > .rp-control__label,
    .rp-control--default:not(.is-nested) legend {
      font-size: .8em;
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
    }
    .rp-control--default:not(.has-value):not(.has-focus):not(.is-inline) > .rp-control__label {
      top: 1.6rem;
      left: .4rem;
      font-size: 1em;
    }
    .rp-control--default.has-focus:not(.is-inline) > .rp-control__label {
      color: #F28525;
    }
    .rp-control--default.has-errors.was-touched > .rp-control__label {
      color: red;
    }

    /* Text Inputs */
    .rp-control--text.rp-control--default .rp-control__input,
    .rp-control--textarea.rp-control--default .rp-control__input {
      width: 100%;
    }

    /* Textarea */
    .rp-control--default .CodeMirror-placeholder {
      color: #d6d6d6;
      opacity: 1;
    }
    .rp-control--default .CodeMirror,
    .rp-control--default .editor-toolbar {
      border-color: #d6d6d6;
      opacity: 1;
    }
    .rp-control--default .editor-toolbar a {
      color: #666 !important; /* Override SimpleMDE styles */
    }
    .rp-control--default .editor-statusbar {
      color: #d6d6d6;
    }

    /* Select */
    .rp-control--default .rp-control__select-btn {
      display: flex;
      width: 100%;
      text-align: left;
    }
    .rp-control--default .rp-control__select-btn > * {
      flex: 1;
    }
    .rp-control--default .rp-control__select-btn > *:not(.rp-control__select-btn-icon) {
      white-space: nowrap;
      overflow: hidden;
      text-overflow: ellipsis;
    }
    .rp-control--default .rp-control__select-btn-icon {
      transform: rotate(0deg);
      transition: .2s all ease-out;
      flex-grow: 0;
      padding: 0 .33rem;
    }
    .rp-control--default.has-focus .rp-control__select-btn-icon {
      transform: rotate(180deg);
    }
    .rp-control--select:not(.has-value) > .rp-control__label { /* Open dropdown by clicking on label */
      pointer-events: none;
    }

    /* Dropdown */
    .rp-control--default.rp-control--select .dropdown {
      position: absolute;
      top: -0.35rem;
      left: -0.3rem;
      box-shadow: 0 0 7px rgba(0, 0, 0, .3);
    }
    .rp-control--default.rp-control--select .dropdown .rp-control__radio input {
      display: none;
    }

    /* List Items */
    .rp-control--default .rp-control__list-item {
      display: block;
      padding: .66rem;
      border-bottom: 1px solid #d6d6d6;
    }
    .rp-control--default .rp-control__list-item.is-checked {
      background-color: rgba(0, 0, 0, .05);
    }
    .rp-control--default .rp-control__list-item:last-child {
      border-bottom: 0;
    }
    .rp-control--default .rp-control__list-item .rp-control__input-container {
      float: right;
      padding-left: calc(.33rem * 2);
    }

    /* Radios */
    .rp-control--default .rp-control__radio label {
      display: block;
      width: 100%;
    }
    .rp-control--default .rp-control__radio input {
      float: right;
      margin: 0;
    }

    /* Checkboxes */
    .rp-control--checkbox.rp-control--default {
      display: flex;
      width: 100%;
      justify-content: space-between;
      flex-wrap: wrap;
    }

    /* Errors */
    .rp-control--default rp-control-errors {
      display: block;
      flex-basis: 100%;
      height: 1rem;
      padding-left: .33rem;
      padding-right: .33rem;
      font-size: .8em;
    }
    .rp-control--default.was-touched rp-control-errors {
      color: red;
    }
    .rp-control--default rp-control-errors ul {
      margin: 0;
      padding: 0;
      list-style-type: none;
    }
  `],
  template: `
    <label
      *ngIf="label"
      (click)="labelClick.emit()"
      [attr.for]="id|async"
      class="rp-control__label"
    >{{label}}</label>

    <div class="rp-control__input-container">
      <ng-content></ng-content>
    </div>

    <rp-control-errors
      *ngIf="!rpControl"
      [class.is-shown]="touched || (showErrors$|async)"
      [errors]="controlErrors|async"
      [messages]="errors"
    ></rp-control-errors>
  `,
  encapsulation: ViewEncapsulation.None,
})
export class RpControlComponent implements OnChanges, OnInit, AfterContentInit {
  @Input() label: string;

  @Input() types = [];

  @Input() value: any;

  @Input() @HostBinding('class.has-focus') hasFocus: boolean;

  @Input() @HostBinding('class.was-touched') touched: boolean;

  @Input() @HostBinding('class.is-disabled') disabled = false;

  @Input() @HostBinding('class.is-inline') inline = false;

  @Input() errors = {}; // Error messages

  @Output() labelClick = new EventEmitter();

  @ContentChild('rpControlInput') input;

  @HostBinding('class.has-value') hasValue = false;

  @HostBinding('class.has-errors') hasErrors = false;

  @HostBinding('class.has-label') hasLabel = true;

  id = new ReplaySubject(1);

  private control: FormControl;

  showErrors$: BehaviorSubject<boolean>;

  controlErrors: Observable<any>;

  constructor(
    private renderer: Renderer,
    private settings: RpControlsSettingsService,
    private el: ElementRef,
    private changeDetectorRef: ChangeDetectorRef,
    @Optional() private formControl: FormControl,
    @Optional() private formControlName: FormControlName,
    @Optional() private rpFormGroup: RpFormGroupDirective,
    @Optional() @SkipSelf() private rpControl: RpControlComponent // Exists if <rp-control> is nested under another <rp-control>
  ) {}

  ngOnChanges({value, label}: SimpleChanges) {
    if (value) {
      this.hasValue = overSome([isBoolean, isNumber, negate(isEmpty)])(value.currentValue);
    }

    if (label) {
      this.hasLabel = !isEmpty(label.currentValue);
    }
  }

  ngOnInit() {
    this.control = this.formControlName ? this.formControlName.control : this.formControl || new FormControl();

    this.controlErrors = this.control.valueChanges
      .startWith({})
      .map(() => this.control.errors || {})
      .do(x => this.hasErrors = !isEmpty(x)); // Update `hasErrors` binding

    // TODO This was added without much testing.
    // - Does this still work with parent FormGroup?
    // - Would errors show up with just a FormControl?
    if (this.rpFormGroup) {
      this.showErrors$ = this.rpFormGroup.showErrors$;
    }

    if (this.rpControl) { // Add class if control is nested within another control
      this.renderer.setElementClass(this.el.nativeElement, 'is-nested', true);
    }

    this.changeDetectorRef.detectChanges(); // Since controlErrors gets a value here
  }

  ngAfterContentInit() {
    if (this.input) {
      const {type, id: elId} = this.input.nativeElement;

      // Add ID to input
      const id = elId || uniqueId('rp-control-');
      this.id.next(id);
      this.renderer.setElementAttribute(this.input.nativeElement, 'id', id);

      // Add class to input
      this.renderer.setElementClass(this.input.nativeElement, 'rp-control__input', true);
    }

    // Add classes to host
    if (!isEmpty(this.settings.themes)) {
      flow(
        defaultTo([]),
        concat(castArray(this.types)),
        flatten,
        compact,
        map(x => `rp-control--${x}`),
        forEach((x) => this.renderer.setElementClass(this.el.nativeElement, x, true))
      )(this.settings.themes);
    }
  }
}
