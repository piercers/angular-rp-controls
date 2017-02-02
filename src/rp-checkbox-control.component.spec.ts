import {Component, DebugElement} from '@angular/core';
import {TestBed, ComponentFixture} from '@angular/core/testing';
import {ReactiveFormsModule, FormControl} from '@angular/forms';
import {By} from '@angular/platform-browser';

import {RpControlsModule} from './rp-controls.module';
import {RpCheckboxControlComponent} from './rp-checkbox-control.component';

const check = (el, checked = true) => el.triggerEventHandler('click', {
  target: {checked}
});

@Component({
  template: `<rp-checkbox-control [formControl]="control"></rp-checkbox-control>`
})
class TestComponent {
  control = new FormControl();
}

describe('RpCheckboxControlComponent', () => {
  const checked = true;
  let fixture: ComponentFixture<TestComponent>;
  let testComponent: TestComponent;
  let component: RpCheckboxControlComponent;
  let host: DebugElement;

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

    host = fixture.debugElement.query(By.directive(RpCheckboxControlComponent));

    component = host.injector.get(RpCheckboxControlComponent);
  });

  it('should be marked as "touched" after input has been clicked', () => {
    spyOn(component, 'onTouched');
    expect(component.touched).toBe(false);
    check(host);
    expect(component.touched).toBe(true);
    expect(component.onTouched).toHaveBeenCalled();
  });

  it('should update "checked" after input has been clicked', () => {
    spyOn(component, 'onChange');
    expect(component.checked).not.toBe(checked);
    check(host);
    expect(component.checked).toBe(checked);
    expect(component.onChange).toHaveBeenCalledWith(checked);
  });
});
