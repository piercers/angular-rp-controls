import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {ReactiveFormsModule} from '@angular/forms';

import {RpControlsSettings, RpControlsCustomize} from './rp-controls-settings.service';
import {RpInputControlComponent} from './rp-input-control.component';
import {RpCheckboxControlComponent} from './rp-checkbox-control.component';
import {RpCheckboxesControlComponent} from './rp-checkboxes-control.component';
import {RpDateControlComponent} from './rp-date-control.component';
import {RpDurationControlComponent} from './rp-duration-control.component';
import {RpPasswordControlComponent} from './rp-password-control.component';
import {RpSelectControlComponent} from './rp-select-control.component';
import {RpOptionDirective} from './rp-option.directive';
import {RpTelControlComponent} from './rp-tel-control.component';
import {RpTimeControlComponent} from './rp-time-control.component';
import {RpToggleControlComponent} from './rp-toggle-control.component';
import {RpTextControlComponent} from './rp-text-control.component';
import {RpControlErrorsComponent} from './rp-control-errors.component';
import {RpControlErrorDirective} from './rp-control-error.directive';
import {RpEmailControlComponent} from './rp-email-control.component';
import {RpRadioControlComponent} from './rp-radio-control.component';
import {RpRadiosControlComponent} from './rp-radios-control.component';
import {RpTextareaControlComponent} from './rp-textarea-control.component';
import {RpNumberControlComponent} from './rp-number-control.component';
import {RpControlsOverlayComponent} from './ui/rp-controls-overlay.component';
import {RpControlsIconComponent} from './ui/rp-controls-icon.component';
import {RpFormGroupDirective} from './rp-form-group.directive';
import {RpFormArrayAddDirective} from './rp-form-array-add.directive';

@NgModule({
  imports: [
    CommonModule,
    ReactiveFormsModule,
  ],
  declarations: [
    RpInputControlComponent,
    RpCheckboxControlComponent,
    RpCheckboxesControlComponent,
    RpDateControlComponent,
    RpDurationControlComponent,
    RpPasswordControlComponent,
    RpSelectControlComponent,
    RpOptionDirective,
    RpTelControlComponent,
    RpTimeControlComponent,
    RpToggleControlComponent,
    RpTextControlComponent,
    RpControlErrorsComponent,
    RpControlErrorDirective,
    RpEmailControlComponent,
    RpRadioControlComponent,
    RpRadiosControlComponent,
    RpTextareaControlComponent,
    RpNumberControlComponent,
    RpControlsOverlayComponent,
    RpControlsIconComponent,
    RpFormGroupDirective,
    RpFormArrayAddDirective,
  ],
  exports: [
    ReactiveFormsModule,
    RpInputControlComponent,
    RpCheckboxControlComponent,
    RpCheckboxesControlComponent,
    RpDateControlComponent,
    RpDurationControlComponent,
    RpPasswordControlComponent,
    RpSelectControlComponent,
    RpOptionDirective,
    RpTelControlComponent,
    RpTimeControlComponent,
    RpToggleControlComponent,
    RpTextControlComponent,
    RpControlErrorsComponent,
    RpControlErrorDirective,
    RpEmailControlComponent,
    RpRadioControlComponent,
    RpRadiosControlComponent,
    RpTextareaControlComponent,
    RpNumberControlComponent,
    RpFormGroupDirective,
    RpFormArrayAddDirective,
  ],
})
export class RpControlsModule {
  static forRoot(config = {}) {
    return {
      ngModule: RpControlsModule,
      providers: [
        RpControlsSettings,
        {provide: RpControlsCustomize, useValue: config},
      ],
    };
  }
}
