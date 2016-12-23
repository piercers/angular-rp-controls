import {Component} from '@angular/core';
import {By} from '@angular/platform-browser';
import {ReactiveFormsModule, FormControl} from '@angular/forms';
import {TestBed, ComponentFixture} from '@angular/core/testing';

import {RpControlsModule} from './rp-controls.module';
import {RpSelectControlComponent} from './rp-select-control.component';

@Component({
  template: `
    <rp-select-control [formControl]="control">
      <rp-option *ngFor="let x of options" [label]="x.name" [value]="x.id"></rp-option>
    </rp-select-control>
  `,
})
class TestComponent {
  control = new FormControl();

  options = [
    {
      name: 'Ryan',
      id: 1,
    },
    {
      name: 'Kanye',
      id: 2,
    },
    {
      name: 'Drake',
      id: 3,
    },
  ];
}

describe('RpSelectControlComponent', () => {
  let fixture: ComponentFixture<TestComponent>;
  let testComponent: TestComponent;
  let component: RpSelectControlComponent;

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

    component = fixture.debugElement.query(By.directive(RpSelectControlComponent))
      .injector.get(RpSelectControlComponent);
  });

  it('should select an option', () => {
    const value = 1;
    fixture.detectChanges(); // Testing an input (formControl)
    expect(testComponent.control.value).toBeFalsy();
    component.select(value);
    expect(testComponent.control.value).toBe(value);
  });

  it('should get options from host child elements', () => {
    fixture.detectChanges(); // Testing a ContentQuery (RpOptionControl)
    expect(component.options.length).toEqual(testComponent.options.length);
  });

  it('should write a value when "value" input changes', () => {
    const value = 4;
    spyOn(component, 'writeValue');
    component.value = value;
    fixture.detectChanges();
    expect(component.writeValue).toHaveBeenCalledWith(value);
  });

  it('should get a string of selected value labels', () => {
    const kanye = testComponent.options[1];
    fixture.detectChanges();
    component.select(kanye.id);
    expect(component.names).toEqual(kanye.name);
  });

  it('should mark component as touched when menu closes', () => {
    component.open();
    expect(component.touched).toBe(false);
    component.open(); // Toggle
    expect(component.touched).toBe(true);
    component.open(); // Toggle
    expect(component.touched).toBe(true);
  });
});
