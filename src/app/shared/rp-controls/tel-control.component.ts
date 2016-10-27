import {Component, ContentChildren, Input, OnInit} from '@angular/core';
import {FormControl} from '@angular/forms';
import {uniqueId} from 'lodash/fp';

import {ControlErrorDirective} from './control-error.directive';

@Component({
  selector: 'tel-control',
  template: `
    <input-control
      [control]="control"
      [errorMessages]="contentErrors|async"
      (id)="id = $event"
      [label]="label"
    >
      <input
        [formControl]="control"
        #inputControlInput
        [placeholder]="placeholder"
        [id]="id"
        type="tel"
      >
    </input-control>
  `,
})
export class TelControlComponent implements OnInit {
  @Input() control = new FormControl();
  @Input() label: string;
  @Input() placeholder = '303-555-1234';
  @ContentChildren(ControlErrorDirective) _contentErrors;

  public id: string;

  ngOnInit() {
    this.id = uniqueId(`tel-${this.label}-`);
  }
}
