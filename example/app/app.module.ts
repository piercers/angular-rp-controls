import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';

import {AppComponent} from './app.component';
import {RpControlsModule} from '../../src/rp-controls.module';

@NgModule({
  imports: [
    BrowserModule,
    RpControlsModule.forRoot({ // See RpControlsSettings for options
      colors: {
        primary: '#b4d1e0',
      },
    }),
  ],
  declarations: [AppComponent],
  bootstrap: [AppComponent]
})
export class AppModule {}
