import {
  Component,
  ChangeDetectionStrategy,
  Input,
  ContentChildren,
  SimpleChanges,
  OnChanges,
  OnInit,
  AfterViewInit,
} from '@angular/core';
import {FormControl} from '@angular/forms';
import {assign, constant, entries, flow, get, head, map, reduce} from 'lodash/fp';
import {ReplaySubject} from 'rxjs/ReplaySubject';
import 'rxjs/add/operator/combineLatest';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/startWith';

import {RpControlsSettings} from './rp-controls-settings.service';
import {ControlErrorDirective} from './control-error.directive';

const errors = {
  required: 'This field is required.',
  minlength: 'Not enough selected.',
};

const mergeControlErrorDirectives = reduce((obj, {message, type}) => assign(obj, {[type]: message}), {});

@Component({
  selector: 'control-errors',
  styles: [`
    :host {
      display: block;
      min-height: .93rem;
      margin-bottom: .2rem;
    }

    .control-errors__message {
      font-size: .85rem;
    }
  `],
  template: `
    <div *ngFor="let error of errorMessages|async" [style.color]="color" class="control-errors__message">{{error}}</div>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ControlErrorsComponent implements OnChanges, OnInit, AfterViewInit {
  @Input() control = new FormControl();
  @Input('messages') _messages;
  @Input() color = this.settings.colors.error || 'red';
  @ContentChildren(ControlErrorDirective) _contentErrors;

  private controlChanges;
  private errors;
  private messagesChanges = new ReplaySubject(1);
  private messages = this.messagesChanges
    .map(mergeControlErrorDirectives);
  private contentErrorsChanges = new ReplaySubject(1);
  private contentErrors = this.contentErrorsChanges
    .map(mergeControlErrorDirectives);
  private errorMessages;

  constructor(private settings: RpControlsSettings) {}

  ngOnChanges({_messages}: SimpleChanges) {
    if (_messages) this.messagesChanges.next(_messages.currentValue || []);
  }

  ngOnInit() {
    this.controlChanges = this.control.valueChanges
      .startWith(this.control.value);

    this.errors = this.controlChanges
      .map(flow(
        constant(this.control), // Get latest control
        get('errors'),
        entries,
        map(head)
      ));

    this.errorMessages = this.errors
      .combineLatest(this.contentErrors, this.messages)
      .map(([activeErrors, contentErrors, messages]) => {
        const combinedMessages = assign(errors, contentErrors, messages);
        return activeErrors.map(error => combinedMessages[error]); // Get mapped error message from error key
      });
  }

  ngAfterViewInit() {
    this.contentErrorsChanges.next(this._contentErrors.toArray());
  }
}
