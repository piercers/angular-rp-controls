import {Component, DebugElement} from '@angular/core';
import {TestBed, ComponentFixture} from '@angular/core/testing';
import {ReactiveFormsModule, FormControl} from '@angular/forms';
import {By} from '@angular/platform-browser';

import {RpControlsModule} from './rp-controls.module';
import {RpInputControlComponent} from './rp-input-control.component';

@Component({
  template: `
    <rp-input-control [formControl]="control"></rp-input-control>
  `,
})
class TestComponent {
  control = new FormControl();
}

describe('RpInputControlComponent', () => {
  const value = 'some input';
  let fixture: ComponentFixture<TestComponent>;
  let testComponent: TestComponent;
  let component: RpInputControlComponent;
  let input: DebugElement;

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

    component = fixture.debugElement.query(By.directive(RpInputControlComponent))
      .injector.get(RpInputControlComponent);

    input = fixture.debugElement.query(By.css('input'));
  });

  it('should track its "touched" state', () => {
    expect(component.touched).toBe(false);
    input.triggerEventHandler('blur', {});
    expect(component.touched).toBe(true);
  });
});
