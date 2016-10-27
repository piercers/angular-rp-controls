import {Component, ChangeDetectionStrategy, ContentChildren, AfterViewInit, Input} from '@angular/core';
import {FormControl} from '@angular/forms';
import {ReplaySubject} from 'rxjs/ReplaySubject';

import {ControlErrorDirective} from './control-error.directive';

@Component({
  selector: 'password-control',
  template: `
    <input-control
      [control]="control"
      [errorMessages]="contentErrors|async"
      (id)="id = $event"
      [label]="label"
    >
      <input
        [formControl]="control"
        [placeholder]="placeholder"
        [id]="id"
        #inputControlInput
        type="password"
      >

      <control-error type="required" message="This text field is required."></control-error>
    </input-control>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PasswordControlComponent implements AfterViewInit {
  @Input() control = new FormControl();
  @Input() placeholder = '';
  @Input() label: string;
  @ContentChildren(ControlErrorDirective) _contentErrors;

  public contentErrors = new ReplaySubject(1);

  ngAfterViewInit() {
    this.contentErrors.next(this._contentErrors.toArray());
  }
}
