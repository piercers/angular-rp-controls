import {FormBuilder, ControlGroup} from '@angular/common';
import {describe, beforeEachProviders, beforeEach, inject, it, expect} from '@angular/core/testing';

import Component from './hour-control.component';

describe('Hour Component', () => {
  beforeEachProviders(() => [
    FormBuilder,
    Component,
  ]);

  let component;

  beforeEach(inject([Component], (_component) => {
    component = _component;
    component.ngOnInit();
  }));

  it('implements a form object', () => {
    expect(component.form instanceof ControlGroup).toBe(true);
  });

  it('has a model object', () => {
    expect((typeof component.model)).toBe('object');
  });
});
