import {Component, ChangeDetectionStrategy, Input, OnInit} from '@angular/core';
import {FormControl} from '@angular/forms';
import {Observable} from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/startWith';

import {notEmpty} from './util/lodash';

@Component({
  selector: 'date-control',
  styles: [`
    input {
      padding: .3rem 0 !important;
    }

    input:not(.show-placeholder):not(.has-value) {
      color: transparent;
    }
  `],
  template: `
    <input-control [label]="label" [control]="control" (id)="id = $event">
      <input
        #inputControlInput
        [formControl]="control"
        [id]="id"
        [class.show-placeholder]="showPlaceholder"
        [class.has-value]="hasValue|async"
        (focus)="showPlaceholder = true"
        (blur)="showPlaceholder = false"
        type="date"
      >
    </input-control>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DateControlComponent implements OnInit {
  @Input() control = new FormControl();
  @Input() label: string;

  public hasValue: Observable<boolean>;

  ngOnInit() {
    this.hasValue = this.control.valueChanges
      .startWith(this.control.value)
      .map(notEmpty);
  }
}
