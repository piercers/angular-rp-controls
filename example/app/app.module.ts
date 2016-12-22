import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';
import {ReactiveFormsModule} from '@angular/forms';

import {AppComponent} from './app.component';
import {RpControlsModule} from '../../src/rp-controls.module';

const errors = {
  required: 'This field is required.',
  minlength: ({requiredLength, actualLength}) => `Field needs ${requiredLength - actualLength} more characters.`,
  maxlength: ({requiredLength}) => `Field must be less than ${requiredLength} characters.`,
};

@NgModule({
  imports: [
    BrowserModule,
    ReactiveFormsModule,
    RpControlsModule.forRoot({ // See RpControlsSettings for options
      colors: {
        primary: '#b4d1e0',
      },
      errors,
    }),
  ],
  declarations: [AppComponent],
  bootstrap: [AppComponent]
})
export class AppModule {}
