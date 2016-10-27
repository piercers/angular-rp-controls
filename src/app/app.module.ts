import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';

import { AppComponent } from './app.component';
import {RpControlsModule, RpControlsCustomize} from './shared/rp-controls/rp-controls.module';
import ControlsFormComponent from './controls-form.component';

@NgModule({
  declarations: [
    AppComponent,
    ControlsFormComponent,
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    RpControlsModule.forRoot(),
  ],
  providers: [
    {provide: RpControlsCustomize, useValue: {
      colors: {
        primary: 'blue',
      },
    }},
  ],
  bootstrap: [AppComponent]
})
export class AppModule {}
