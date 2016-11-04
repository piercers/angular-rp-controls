import {Injectable} from '@angular/core';
import {merge} from 'lodash';

export class RpControlsCustomize {}

@Injectable()
export class RpControlsSettings {
    public colors = {
        primary: '#666',
        error: 'red',
        placeholder: '', // TODO Implement
        accent: '', // TODO Implement
    };

    constructor(private customized: RpControlsCustomize) {
        merge(this, customized); // Merges customizations onto class props
    }
}
