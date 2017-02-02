import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {ReactiveFormsModule} from '@angular/forms';

import {RpControlComponent} from './rp-control.component';
import {RpControlsSettingsService, RpControlsConfig} from './rp-controls-settings.service';
import {RpControlErrorsComponent} from './rp-control-errors.component';
import {RpSelectControlComponent} from './rp-select-control.component';
import {RpInputControlComponent} from './rp-input-control.component';
import {RpTextareaControlComponent} from './rp-textarea-control.component';
import {RpOptionComponent} from './rp-option.component';
import {RpRadiosControlComponent} from './rp-radios-control.component';
import {RpCheckboxControlComponent} from './rp-checkbox-control.component';
import {RpCheckboxesControlComponent} from './rp-checkboxes-control.component';
import {RpControlsOverlayComponent} from './ui/rp-controls-overlay.component';
import {RpFormGroupDirective} from './rp-form-group.directive';
import {RpFormArrayAddDirective} from './rp-form-array-add.directive';
import {RpFormArrayLabelComponent} from './rp-form-array-label.component';

@NgModule({
  imports: [
    CommonModule,
    ReactiveFormsModule,
  ],
  declarations: [
    RpControlComponent,
    RpControlErrorsComponent,
    RpSelectControlComponent,
    RpInputControlComponent,
    RpTextareaControlComponent,
    RpOptionComponent,
    RpRadiosControlComponent,
    RpCheckboxControlComponent,
    RpCheckboxesControlComponent,
    RpControlsOverlayComponent,
    RpFormArrayAddDirective,
    RpFormArrayLabelComponent,
    RpFormGroupDirective,
  ],
  exports: [
    RpControlComponent,
    RpControlErrorsComponent,
    RpSelectControlComponent,
    RpInputControlComponent,
    RpTextareaControlComponent,
    RpOptionComponent,
    RpRadiosControlComponent,
    RpCheckboxControlComponent,
    RpCheckboxesControlComponent,
    RpFormArrayAddDirective,
    RpFormArrayLabelComponent,
    RpFormGroupDirective,
  ],
})
export class RpControlsModule {
  static forRoot(config: RpControlsConfig) {
    return {
      ngModule: RpControlsModule,
      providers: [
        RpControlsSettingsService,
        {provide: RpControlsConfig, useValue: config}
      ],
    };
  }
}
