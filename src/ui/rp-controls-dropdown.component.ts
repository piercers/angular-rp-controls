import {Component, ChangeDetectionStrategy, Input, Output, EventEmitter, HostBinding} from '@angular/core';

import {RpControlsSettingsService} from '../rp-controls-settings.service';

@Component({
  selector: 'rp-controls-dropdown',
  styles: [`
    :host {
      position: absolute;
      display: none;
      left: 0;
      z-index: 1000;
      box-shadow: 0 0 1px rgba(0,0,0,0.15);
      background-color: white;
    }

    :host.is-open {
      display: block;
    }

    rp-controls-overlay {
      z-index: initial !important;
    }
  `],
  template: `
    <rp-controls-overlay [open]="open" (click)="overlayClick.emit()" [opacity]="dropdown.opacity"></rp-controls-overlay>

    <div>
      <ng-content></ng-content>
    </div>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class RpControlsDropdownComponent {
  @Input()
  @HostBinding('class.is-open')
  open = false;

  @Output() overlayClick = new EventEmitter();

  dropdown = this.settings.dropdown;

  constructor(private settings: RpControlsSettingsService) {}
}
