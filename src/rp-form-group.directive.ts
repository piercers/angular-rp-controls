import {
  Directive,
  Input,
  Output,
  EventEmitter,
  HostListener,
  OnChanges,
  SimpleChanges,
} from '@angular/core';
import {FormGroup} from '@angular/forms';
import {BehaviorSubject} from 'rxjs/BehaviorSubject';

@Directive({selector: '[formGroup]'})
export class RpFormGroupDirective implements OnChanges {
  /**
   * Access host's FormGroup
   */
  @Input() formGroup = new FormGroup({});

  /**
   * Manually show errors
   */
  @Input() showErrors = false;

  /**
   * Emits formGroup value if formGroup is valid
   */
  @Output() rpSubmit = new EventEmitter();

  /**
   * Emits true when an invalid form is submitted
   */
  @Output() submitFail = new EventEmitter();

  /**
   * Boolean steam of error display toggling
   * TODO Doesn't look like this is ever false after it's been triggered once
   */
  showErrors$ = new BehaviorSubject(false);

  /**
   * Handle form submissions, marking as failed and preventing submit if formGroup is invalid
   */
  @HostListener('submit') catchSubmit() {
    if (this.formGroup.invalid) {
      // TODO Scroll to top
      this.submitFail.emit(true);
      this.showErrors$.next(true);
    } else {
      this.rpSubmit.emit(this.formGroup.value);
    }
  }

  /**
   * Check formGroup validity and show errors if needed
   */
  ngOnChanges({showErrors}: SimpleChanges) {
    if (showErrors && showErrors.currentValue === true) {
      this.catchSubmit(); // Initialize outputs with form status
    }
  }
}
