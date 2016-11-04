import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {ReactiveFormsModule} from '@angular/forms';

import {RpControlsSettings, RpControlsCustomize} from './rp-controls-settings.service';
import {RpInputControlComponent} from './rp-input-control.component';
import {RpAddressControlComponent} from './rp-address-control.component';
import {RpCheckboxControlComponent} from './rp-checkbox-control.component';
import {RpCheckboxesControlComponent} from './rp-checkboxes-control.component';
import {RpDateControlComponent} from './rp-date-control.component';
import {RpDaysControlComponent} from './rp-days-control.component';
import {RpDurationControlComponent} from './rp-duration-control.component';
import {RpPasswordControlComponent} from './rp-password-control.component';
import {RpSelectControlComponent} from './rp-select-control.component';
import {RpOptionDirective} from './rp-option.directive';
import {RpTelControlComponent} from './rp-tel-control.component';
import {RpTimeControlComponent} from './rp-time-control.component';
import {RpToggleControlComponent} from './rp-toggle-control.component';
import {RpHoursControlComponent} from './hours/rp-hours-control.component';
import {RpHourControlComponent} from './hours/rp-hour-control.component';
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

export {RpControlsCustomize} from './rp-controls-settings.service';

@NgModule({
  imports: [
    CommonModule,
    ReactiveFormsModule,
  ],
  declarations: [
    RpInputControlComponent,
    RpAddressControlComponent,
    RpCheckboxControlComponent,
    RpCheckboxesControlComponent,
    RpDateControlComponent,
    RpDaysControlComponent,
    RpDurationControlComponent,
    RpPasswordControlComponent,
    RpSelectControlComponent,
    RpOptionDirective,
    RpTelControlComponent,
    RpTimeControlComponent,
    RpToggleControlComponent,
    RpHourControlComponent,
    RpHoursControlComponent,
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
  ],
  exports: [
    ReactiveFormsModule,
    RpInputControlComponent,
    RpAddressControlComponent,
    RpCheckboxControlComponent,
    RpCheckboxesControlComponent,
    RpDateControlComponent,
    RpDaysControlComponent,
    RpDurationControlComponent,
    RpPasswordControlComponent,
    RpSelectControlComponent,
    RpOptionDirective,
    RpTelControlComponent,
    RpTimeControlComponent,
    RpToggleControlComponent,
    RpHourControlComponent,
    RpHoursControlComponent,
    RpTextControlComponent,
    RpControlErrorsComponent,
    RpControlErrorDirective,
    RpEmailControlComponent,
    RpRadioControlComponent,
    RpRadiosControlComponent,
    RpTextareaControlComponent,
    RpNumberControlComponent,
    RpFormGroupDirective,
  ],
})
export class RpControlsModule {
  static forRoot() {
    return {
      ngModule: RpControlsModule,
      providers: [RpControlsSettings, RpControlsCustomize],
    };
  }
}
