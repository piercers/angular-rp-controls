import {Component, DebugElement} from '@angular/core';
import {ReactiveFormsModule, FormControl} from '@angular/forms';
import {By} from '@angular/platform-browser';
import {TestBed, ComponentFixture, async} from '@angular/core/testing';

import {RpControlsModule} from './rp-controls.module';
import {RpTextareaControlComponent} from './rp-textarea-control.component';

@Component({
  template: `
    <rp-textarea-control [formControl]="control"></rp-textarea-control>
  `,
})
class TestComponent {
  control = new FormControl();
}

describe('RpTextareaControlComponent', () => {
  let fixture: ComponentFixture<TestComponent>;
  let testComponent: TestComponent;
  let component: RpTextareaControlComponent;
  let textarea: DebugElement;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        ReactiveFormsModule,
        RpControlsModule.forRoot(),
      ],
      declarations: [TestComponent],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TestComponent);

    testComponent = fixture.componentInstance;

    component = fixture.debugElement.query(By.directive(RpTextareaControlComponent))
      .injector.get(RpTextareaControlComponent);

    textarea = fixture.debugElement.query(By.css('textarea'));

    component.ngAfterViewInit(); // So SimpleMDE can load
  });

  it('should track when control has focus', () => {
    expect(component.hasFocus).toBe(false);
    textarea.triggerEventHandler('focus', {});
    expect(component.hasFocus).toBe(true);
    textarea.triggerEventHandler('blur', {});
    expect(component.hasFocus).toBe(false);
  });

  it('should mark property "touched" after it has lost focus', () => {
    expect(component.touched).toBe(false);
    textarea.triggerEventHandler('focus', {});
    expect(component.touched).toBe(false);
    textarea.triggerEventHandler('blur', {});
    expect(component.touched).toBe(true);
  });

  it('should report changes on text input', () => {
    const value = 'some input';
    spyOn(component, 'onChange');
    textarea.triggerEventHandler('input', {
      target: {
        value,
      },
    });
    expect(component.value).toBe(value);
    expect(component.onChange).toHaveBeenCalledWith(value);
  });

  it('should have textarea element', () => {
    expect(component.textarea.nativeElement).toBeDefined();
  });

  xit('should convert to a SimpleMDE textarea if "rte"', () => {});

  xit('should destroy the SimpleMDE instance', () => {});
});
