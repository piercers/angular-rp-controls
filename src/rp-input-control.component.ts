import {
  Component,
  Input,
  Output,
  EventEmitter,
  SimpleChanges,
  OnChanges,
  OnInit,
  AfterViewInit,
  ContentChild,
  ContentChildren,
  Renderer,
  ViewEncapsulation,
} from '@angular/core';
import {FormControl} from '@angular/forms';
import {compact, flatten, flow, isNumber, overSome, uniqueId} from 'lodash/fp';
import {Observable} from 'rxjs/Observable';
import {ReplaySubject} from 'rxjs/ReplaySubject';
import 'rxjs/add/observable/combineLatest';
import 'rxjs/add/observable/empty';
import 'rxjs/add/operator/combineLatest';
import 'rxjs/add/operator/do';
import 'rxjs/add/operator/filter';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/scan';
import 'rxjs/add/operator/startWith';

import {notEmpty} from './util/lodash';
import {BoolToggle} from './util/rxjs';
import {RpControlErrorDirective} from './rp-control-error.directive';

@Component({
  selector: 'rp-input-control',
  styles: [`
    :host {
      display: block;
    }

    .rp-controls__input-control {
      display: block;
      position: relative;
      margin-bottom: .2rem;
    }

    .rp-controls__input-control.is-inline {
      display: flex;
      align-items: center;
    }

    .rp-controls__input-control:not(.is-inline)::after {
      content: '';
      position: absolute;
      background-color: #eee;
      left: 0;
      bottom: 0px;
      right: 0;
      height: 1px;
    }

    .rp-controls__input-control.is-active::after {
      height: 2px;
      background-color: #666;
    }

    .rp-controls__input-control.has-errors::after {
      background-color: red;
    }

    .rp-controls__input-control label {
      display: block;
      position: relative;
      top: 0;
      height: .85rem;
      transition: all .2s ease-out;
      cursor: pointer;
    }

    .rp-controls__input-control label.has-errors {
      color: red;
    }

    .rp-controls__input-control label:not(.is-inline) {
      font-size: .85rem;
    }

    .rp-controls__input-control label.is-inline {
      flex-grow: 1;
    }

    .rp-controls__input-control label:not(.is-down):not(.is-inline) {
      font-size: 1rem;
      top: 1.55rem;
    }

    .rp-controls__fieldset {
      margin-top: 1.85rem;
      margin-bottom: 1rem;
      padding: .85rem 0; /* TODO Use variable for .85rem */
      border: 1px solid #eee;
      border-left: 0;
      border-right: 0;
    }

    .rp-controls__legend {
      display: inline-block;
      width: 100%;
      font-size: .85rem;
      padding: 0;
    }

    .rp-controls__input-control__input {
      width: 100%;
      font-size: 1rem;
      padding: .5rem 0 !important;
      border: 0;
      vertical-align: top;
      background-color: transparent;
      outline: none;
    }
  `],
  template: `
    <div
      [class.is-active]="isActive.$|async"
      [class.has-errors]="(hasErrors|async) && control.touched"
      [class.is-inline]="inline"
      class="rp-controls__input-control"
    >
      <label
        *ngIf="label"
        (click)="labelClick.emit()"
        [class.is-down]="isDown|async"
        [class.is-inline]="inline"
        [class.has-errors]="(hasErrors|async) && control.touched"
        [attr.for]="id"
      >
        {{label}}
      </label>

      <ng-content></ng-content>
    </div>

    <rp-control-errors
      *ngIf="control"
      [errors]="control.errors"
      [touched]="control.touched"
      [messages]="combinedMessages"
    ></rp-control-errors>
  `,
  encapsulation: ViewEncapsulation.None,
})
export class RpInputControlComponent implements OnChanges, OnInit, AfterViewInit {
  @Input() control: FormControl;
  @Input() label: string;
  @Input() inline;
  @Input() active;
  @Input('errorMessages') inputErrors = Observable.empty();
  @Input() labelUp = false;

  @Output('id') _id = new EventEmitter();
  @Output() labelClick = new EventEmitter();

  @ContentChild('inputControlInput') input;
  @ContentChildren(RpControlErrorDirective) _contentErrors;

  private id = uniqueId('rp-controls__input-control-');
  private controlValue;
  private hasValue;
  private errors;
  private contentErrors = new ReplaySubject(1);
  private valueChanges = new ReplaySubject(1);
  public hasErrors;
  public isDown;
  public combinedMessages;
  public isActive = BoolToggle();

  constructor(private renderer: Renderer) {}

  ngOnChanges({active}: SimpleChanges) {
    if (active) this.isActive.next(active.currentValue);
  }

  ngOnInit() {
    this._id.emit(this.id);

    this.controlValue = this.control ? this.control.valueChanges.startWith(this.control.value) : this.valueChanges;

    this.hasValue = this.controlValue
      .map(overSome([isNumber, notEmpty])); // notEmpty() wasn't working with numbers

    this.errors = this.controlValue
      .map(() => this.control ? this.control.errors : {});

    this.hasErrors = this.errors
      .map(notEmpty);

    this.isDown = Observable
      .combineLatest(this.hasValue, this.isActive.$)
      .map(([hasValue, isActive]) => this.labelUp || hasValue || isActive);

    this.combinedMessages = Observable.combineLatest(this.contentErrors, this.inputErrors)
      .map(flow(compact, flatten));
  }

  ngAfterViewInit() {
    this.contentErrors.next(this._contentErrors.toArray());

    if (this.input) { // If an input element has the #inputControlInput ref, handle checking its activity
      const placeholder = this.input.nativeElement.placeholder; // Store initial placeholder text
      this.clearPlaceholder(this.input.nativeElement); // Hide placeholder until focused

      this.valueChanges.next(this.input.nativeElement.value); // Get initial value from input

      this.renderer.listen(
        this.input.nativeElement,
        'change',
        (e) => this.valueChanges.next(e.target.value)
      );

      this.renderer.setElementClass( // Set class to add base styles to input
        this.input.nativeElement,
        'rp-controls__input-control__input',
        true
      );

      this.renderer.listen(
        this.input.nativeElement,
        'focus',
        () => {
          this.isActive.next(true);

          this.renderer.setElementProperty(
            this.input.nativeElement,
            'placeholder',
            placeholder
          );
        }
      );

      this.renderer.listen(
        this.input.nativeElement,
        'blur',
        () => {
          this.isActive.next(false);

          this.clearPlaceholder(this.input.nativeElement);
        }
      );
    }
  }

  clearPlaceholder(el) {
    if (this.label) {
      this.renderer.setElementProperty(el, 'placeholder', '');
    }
  }
}
