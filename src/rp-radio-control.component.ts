import {Component, Input, HostBinding, OnInit} from '@angular/core';

@Component({
  selector: 'rp-radio-control',
  styles: [`
    :host {
      cursor: pointer;
    }

    :host.is-checked {
      font-weight: bold;
    }

    input {
      float: right;
    }
  `],
  template: `
    <rp-input-control
      [label]="label"
      (id)="id = $event"
      [inline]="true"
    >
      <input
        [checked]="checked"
        [value]="value"
        [id]="id"
        type="radio"
      >
    </rp-input-control>
  `,
})
export class RpRadioControlComponent implements OnInit {
  @Input() @HostBinding('class.is-checked') checked: boolean;
  @Input() value: any;
  @Input() label: string;

  ngOnInit() {
    this.label = this.label || this.value;
  }
}
