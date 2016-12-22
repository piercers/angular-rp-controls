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

  @Input() formGroup = new FormGroup({});

  @Input() showErrors = false;

  @Output() rpSubmit = new EventEmitter();

  @Output() submitFail = new EventEmitter();

  showErrors$ = new BehaviorSubject(false);

  @HostListener('submit') catchSubmit() {
    if (this.formGroup.invalid) {
      // TODO Scroll to top
      this.submitFail.emit(true);
      this.showErrors$.next(true);
    } else {
      this.rpSubmit.emit(this.formGroup.value);
    }
  }

  ngOnChanges({showErrors}: SimpleChanges) {
    if (showErrors && showErrors.currentValue === true) {
      this.catchSubmit(); // Initialize outputs with form status
    }
  }
}
