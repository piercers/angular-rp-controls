import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {ReactiveFormsModule} from '@angular/forms';

import {RpControlsSettings, RpControlsCustomize} from './rp-controls-settings.service';
import {InputControlComponent} from './input-control.component';
import {AddressControlComponent} from './address-control.component';
import {CheckboxControlComponent} from './checkbox-control.component';
import {CheckboxControlSetComponent} from './checkbox-control-set.component';
import {DateControlComponent} from './date-control.component';
import {DaysControlComponent} from './days-control.component';
import {DurationControlComponent} from './duration-control.component';
import {PasswordControlComponent} from './password-control.component';
import {SelectControlComponent} from './select-control.component';
import {SelectOptionDirective} from './select-option.directive';
import {TelControlComponent} from './tel-control.component';
import {TimeControlComponent} from './time-control.component';
import {ToggleControlComponent} from './toggle-control.component';
import {HoursControlComponent} from './hours/hours-control.component';
import {HourControlComponent} from './hours/hour-control.component';
import {TextControlComponent} from './text-control.component';
import {ControlErrorsComponent} from './control-errors.component';
import {ControlErrorDirective} from './control-error.directive';
import {EmailControlComponent} from './email-control.component';
import {RadioControlComponent} from './radio-control.component';
import {RadioControlSetComponent} from './radio-control-set.component';
import {StatusControlComponent} from './status-control.component';
import {SocialsControlComponent} from './socials-control.component';
import {TextareaControlComponent} from './textarea-control.component';
import {NumberControlComponent} from './number-control.component';
import {RpControlsOverlayComponent} from './ui/rp-controls-overlay.component';
import {RpControlsIconComponent} from './ui/rp-controls-icon.component';

export {RpControlsCustomize} from './rp-controls-settings.service';

@NgModule({
  imports: [
    CommonModule,
    ReactiveFormsModule,
  ],
  declarations: [
    InputControlComponent,
    AddressControlComponent,
    CheckboxControlComponent,
    CheckboxControlSetComponent,
    DateControlComponent,
    DaysControlComponent,
    DurationControlComponent,
    PasswordControlComponent,
    SelectControlComponent,
    SelectOptionDirective,
    TelControlComponent,
    TimeControlComponent,
    ToggleControlComponent,
    HourControlComponent,
    HoursControlComponent,
    TextControlComponent,
    ControlErrorsComponent,
    ControlErrorDirective,
    EmailControlComponent,
    RadioControlComponent,
    RadioControlSetComponent,
    StatusControlComponent,
    SocialsControlComponent,
    TextareaControlComponent,
    NumberControlComponent,
    RpControlsOverlayComponent,
    RpControlsIconComponent,
  ],
  exports: [
    ReactiveFormsModule,
    InputControlComponent,
    AddressControlComponent,
    CheckboxControlComponent,
    CheckboxControlSetComponent,
    DateControlComponent,
    DaysControlComponent,
    DurationControlComponent,
    PasswordControlComponent,
    SelectControlComponent,
    SelectOptionDirective,
    TelControlComponent,
    TimeControlComponent,
    ToggleControlComponent,
    HourControlComponent,
    HoursControlComponent,
    TextControlComponent,
    ControlErrorsComponent,
    ControlErrorDirective,
    EmailControlComponent,
    RadioControlComponent,
    RadioControlSetComponent,
    StatusControlComponent,
    SocialsControlComponent,
    TextareaControlComponent,
    NumberControlComponent,
  ],
})
export class RpControlsModule {
  static forRoot() {
    return {
      ngModule: RpControlsModule,
      providers: [RpControlsSettings, RpControlsCustomize],
    }
  }
}
