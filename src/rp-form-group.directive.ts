import {
  Directive,
  Input,
  Output,
  EventEmitter,
  HostListener,
  SimpleChanges,
  OnChanges,
} from '@angular/core';
import {FormGroup} from '@angular/forms';

import {BoolToggle, BoolToggleI} from './util/rxjs';

@Directive({
  selector: '[formGroup]',
})
export class RpFormGroupDirective implements OnChanges {
  @Input('formGroup') form = new FormGroup({});
  @Input() showErrors: boolean;
  @Output() rpSubmit = new EventEmitter();

  public isShowingErrors: BoolToggleI = BoolToggle();

  ngOnChanges({showErrors}: SimpleChanges) {
    if (this.showErrors) {
      this.isShowingErrors.next(showErrors.currentValue);
    }
  }

  // get errors() {
  //   // This could return an object of all errors on form
  //   // - Could possibly even link to labels
  // }

  @HostListener('submit', ['$event'])
  catchSubmit(x) {
    if (this.form.invalid) {
      this.isShowingErrors.next(true);
    } else {
      this.rpSubmit.emit(this.form.value);
    }
  }
}
