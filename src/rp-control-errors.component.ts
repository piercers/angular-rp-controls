import {Component, Input, ChangeDetectionStrategy} from '@angular/core';
import {assignAll, castArray, constant, defaultTo, entries, flow, isFunction, map, mapValues} from 'lodash/fp';

import {RpControlsSettingsService} from './rp-controls-settings.service';

/**
 * Creates a map of error codes and functions that return error messages
 */
const formatMessages = flow( // ((messageMap || [messageMap]) = []): {[errorCode = '']: (value): ''}
  castArray, // Allow a single map or array of maps
  map(defaultTo({})), // Ensure we're only dealing with objects
  assignAll, // Merge all to single object
  mapValues(x => isFunction(x) ? x : constant(x)) // Cast to function
);

/**
 * Resolves error message functions if they exist, otherwise returns error code
 */
const getMessagesFromErrors = (messages = {}) => flow( // (errorMap = {}): ''
  defaultTo({}),
  entries,
  map(([code = '', value]) => {
    const fn = messages[code]; // If exists, it's a known error message
    return fn ? fn(value) : code; // Unknown error message default to error code
  })
);

@Component({
  selector: 'rp-control-errors',
  template: `
    <ul>
      <li *ngFor="let error of errorMessages" class="rp-controls__error">{{error}}</li>
    </ul>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class RpControlErrorsComponent {
  /**
   * Map of errors from form control
   */
  @Input() errors = {};

  /**
   * Map of error code keys and error message strings or functions
   */
  @Input() messages = {};

  /**
   * List of active error message strings
   */
  get errorMessages() {
    return getMessagesFromErrors(formatMessages([this.settings.errors, this.messages]))(this.errors);
  }

  constructor(private settings: RpControlsSettingsService) {}
}
