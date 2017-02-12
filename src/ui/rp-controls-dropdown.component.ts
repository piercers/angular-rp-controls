import {Component, ChangeDetectionStrategy, Input, Output, EventEmitter} from '@angular/core';

import {RpControlsSettingsService} from '../rp-controls-settings.service';

@Component({
  selector: 'rp-controls-dropdown',
  styles: [`
    :host {
      position: relative;
      width: 100%;
    }

    :host.is-absolute {
      position: absolute;
      top: 0;
    }

    .dropdown {
      position: absolute;
      left: 0;
      z-index: 10;
      box-shadow: 0 0 1px rgba(0,0,0,0.15);
      background-color: white;
    }
  `],
  template: `
    <rp-controls-overlay [open]="open" (click)="overlayClick.emit()" [opacity]="dropdown.opacity"></rp-controls-overlay>

    <div *ngIf="open" class="dropdown">
      <ng-content></ng-content>
    </div>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class RpControlsDropdownComponent {
  @Input() open = false;

  @Output() overlayClick = new EventEmitter();

  dropdown = this.settings.dropdown;

  constructor(private settings: RpControlsSettingsService) {}
}
