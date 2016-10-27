import {ControlArray} from '@angular/common';
import {describe, beforeEachProviders, beforeEach, inject, it, explain} from '@angular/core/testing';

import Component from './hours-control.component';

describe('Hours Component', () => {
  beforeEachProviders(() => [
    Component,
  ]);

  let component;

  const hourObject1 = {
    start: '1pm',
  };

  const hourObject2 = {
    start: '2pm',
  };

  const model = [hourObject2];

  beforeEach(inject([Component], (_component) => {
    component = Object.assign(_component, {
      model,
    });

    component.ngOnInit();
  }));

  it('has a model array', () => {
    expect(Array.isArray(component.model)).toBe(true);
  });

  it('implements a control array at form', () => {
    expect(component.form instanceof ControlArray).toBe(true);
  });

  it('adds hour objects to the model', () => {
    const count = component.model.length;

    component.add(hourObject1);

    expect(component.model.length).toBe(count + 1);
  });

  it('removes hour objects from the model', () => {
    const count = component.model.length;

    component.remove(hourObject2);

    expect(component.model.length).toBe(count - 1);
  });
});
