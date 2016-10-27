import {
  Component,
  Input,
  Output,
  ChangeDetectionStrategy,
  EventEmitter,
  OnInit,
  OnDestroy,
} from '@angular/core';
import {FormControl} from '@angular/forms';
import {Subscription} from 'rxjs/Subscription';

import {RpControlsSettings} from './rp-controls-settings.service';

@Component({
  selector: 'checkbox-control',
  host: {
    '[class.is-checked]': 'checked',
    '[class.is-disabled]': 'disabled',
  },
  styles: [`
    :host {
      display: block;
      margin-top: .2rem;
      font-weight: normal;
    }

    :host.is-checked {
      font-weight: bold;
    }

    :host.is-disabled,
    :host.is-disabled .checkbox {
      opacity: .6;
    }

    .is-hidden {
      display: none;
    }

    input {
      display: none;
    }

    .checkbox {
      position: relative;
      width: 1.33rem;
      height: 1.33rem;
      margin-left: .5rem;
      cursor: pointer;
      border-radius: 3px;
    }

    .checkmark {
      position: absolute;
      transform: translateY(-50%) rotate(45deg);
      top: 50%;
      left: 0;
      right: 0;
      text-align: center;
      font-size: 0rem;
      opacity: 0;
      color: white;
      transition: all .2s ease-out;
    }

    .checkmark.is-checked {
      opacity: 1;
      transform: translateY(-50%) rotate(0deg);
      font-size: 1rem;
    }
  `],
  template: `
    <input-control
      [control]="control"
      [label]="label"
      (id)="id = $event"
      [inline]="true"
      [hideErrors]="hideErrors"
    >
      <input
        [formControl]="control"
        [id]="id"
        [disabled]="disabled"
        type="checkbox"
      >

      <span
        (click)="check()"
        [class.is-hidden]="hideCheckbox"
        [style.background-color]="color"
        class="checkbox"
      >
        <rp-controls-icon
          name="check"
          [class.is-checked]="checked"
          class="checkmark"
        ></rp-controls-icon>
      </span>
    </input-control>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CheckboxControlComponent implements OnInit, OnDestroy {
  @Input() control = new FormControl();
  @Input() label: string;
  @Input() disabled = false;
  @Input() checked = false;
  @Input() hideCheckbox = false;
  @Input() hideErrors = false;
  @Input() color = this.settings.colors.primary || 'black';
  @Output() checkedChange = new EventEmitter();

  private subs: Subscription;

  constructor(private settings: RpControlsSettings) {}

  ngOnInit() {
    this.control = this.control || new FormControl(this.checked);

    this.subs = this.control.valueChanges
      .subscribe(x => this.checkedChange.emit(x));
  }

  ngOnDestroy() {
    this.subs.unsubscribe();
  }

  check() {
    this.control.patchValue(!this.control.value); // Toggle control's value
    this.checked = this.control.value;
  }
}
