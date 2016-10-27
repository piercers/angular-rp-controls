import {describe, expect, it, beforeEachProviders, inject} from '@angular/core/testing';
import {FormBuilder} from '@angular/common';

import DurationComponent from './duration.component';

describe('Duration Component', () => {
  beforeEachProviders(() => [
    FormBuilder,
    DurationComponent,
  ]);

  it('has a model object', inject([DurationComponent], (component) => {
    component.ngOnInit();

    expect(typeof component.model).toBe('object');
  }));

  it('requires the "amount" and "units" field');
});
