import {Component} from '@angular/core';
import {By} from '@angular/platform-browser';
import {ReactiveFormsModule, FormControl} from '@angular/forms';
import {TestBed, ComponentFixture} from '@angular/core/testing';
import {isArray} from 'lodash/fp';

import {RpControlsModule} from './rp-controls.module';
import {RpCheckboxesControlComponent} from './rp-checkboxes-control.component';
import {RpOptionComponent} from './rp-option.component';

@Component({
  template: `
    <rp-checkboxes-control [formControl]="control">
      <rp-option *ngFor="let x of options" [label]="x.label" [value]="x.username"></rp-option>
    </rp-checkboxes-control>
  `,
})
class TestComponent {
  control = new FormControl();

  options = [
    {
      label: 'Ryan',
      username: 'userryan',
    },
    {
      label: 'Kanye',
      username: 'userkanye',
    },
    {
      label: 'Elon',
      username: 'userelon',
    },
  ];
}

describe('RpCheckboxesControlComponent', () => {
  let fixture: ComponentFixture<TestComponent>;
  let testComponent: TestComponent;
  let component: RpCheckboxesControlComponent;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        ReactiveFormsModule,
        RpControlsModule.forRoot(),
      ],
      declarations: [TestComponent],
    });

    fixture = TestBed.createComponent(TestComponent);

    testComponent = fixture.componentInstance;

    component = fixture.debugElement.query(By.directive(RpCheckboxesControlComponent))
      .injector.get(RpCheckboxesControlComponent);
  });

  it('should emit changes whenever a selection is made', () => {
    spyOn(component, 'onChange');
    spyOn(component.changes, 'emit');
    component.select('userryan');
    expect(component.onChange).toHaveBeenCalled();
    expect(component.changes.emit).toHaveBeenCalled();
  });

  it('should write new values whenever "value" input changes', () => {
    spyOn(component, 'writeValue');
    component.value = ['userryan'];
    fixture.detectChanges();
    expect(component.writeValue).toHaveBeenCalled();
  });

  it('should does not allow selections past limit', () => {
    const limit = 2;
    component.limit = limit;
    component.select('userryan');
    component.select('userkanye');
    component.select('userelon');
    expect(component.value.length).toBe(limit);
  });

  it('should toggle selections if item was previously selected', () => {
    component.select('userryan');
    component.select('userkanye');
    expect(component.value.length).toBe(2);
    component.select('userryan');
    expect(component.value.length).toBe(1);
  });

  it('should receive options passed in as child elements', () => {
    fixture.detectChanges();
    expect(component.options.length).toEqual(testComponent.options.length);
  });

  it('should return an array of selected items at "value" property', () => {
    expect(isArray(component.value)).toBe(true);
  });
});
