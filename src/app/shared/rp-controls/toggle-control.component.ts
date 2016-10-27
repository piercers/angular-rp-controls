import {Component, EventEmitter, Input, Output, ChangeDetectionStrategy, OnInit} from '@angular/core';
import {FormControl} from '@angular/forms';
import {Subject} from 'rxjs/Subject';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/merge';
import 'rxjs/add/operator/startWith';

import {RpControlsSettings} from './rp-controls-settings.service';

@Component({
  selector: 'toggle-control',
  styles: [`
    input {
      display: none;
    }

    .toggle-control__toggle {
      font-size: 2rem;
    }
  `],
  template: `
    <input-control
      [control]="control"
      [errorMessages]="contentErrors|async"
      (id)="id = $event"
      [label]="label"
      [inline]="true"
    >
      <input
        #inputControlInput
        [id]="id"
        (change)="check(inputControlInput.checked)"
        type="checkbox"
      >

      <rp-controls-icon
        *ngIf="checked|async"
        (click)="check(false)"
        name="toggle-on"
        [style.color]="color"
        class="toggle-control__toggle toggle-control__toggle--on"
      ></rp-controls-icon>

      <rp-controls-icon
        *ngIf="!(checked|async)"
        (click)="check(true)"
        name="toggle-off"
        [style.color]="color"
        class="toggle-control__toggle"
      ></rp-controls-icon>
    </input-control>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ToggleControlComponent implements OnInit {
  @Input() control = new FormControl();
  @Input() label: string;
  @Input() model;
  @Input() color = this.settings.colors.primary || 'inherit';
  @Output() modelChange = new EventEmitter();

  private checked;

  constructor(private settings: RpControlsSettings) {}

  check(checked) {
    this.control.patchValue(checked);
    this.modelChange.emit(checked);
  }

  ngOnInit() {
    this.checked = new Subject()
      .startWith(this.control.value || this.model)
      .merge(this.control.valueChanges);
  }
}
