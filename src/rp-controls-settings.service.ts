import {Injectable, Optional} from '@angular/core';
import {merge} from 'lodash';

export class RpControlsConfig {}

@Injectable()
export class RpControlsSettingsService {
  themes = ['default', 'app'];

  colors = {
    primary: '#666',
    error: 'red',
    accent: '', // TODO Implement
  };

  errors = {
    required: 'required',
    minlength: 'minimum length',
    maxlength: 'maxmimum length',
  };

  dropdown = {
    opacity: .4,
  };

  constructor(@Optional() private config: RpControlsConfig) {
    if (config) merge(this, config); // Merges customizations onto class props
  }
}
