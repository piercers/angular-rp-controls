import {Component, DebugElement, ViewChild} from '@angular/core';
import {TestBed, ComponentFixture, async} from '@angular/core/testing';
import {By} from '@angular/platform-browser';
import {FormBuilder, Validators, ReactiveFormsModule} from '@angular/forms';

import {RpFormGroupDirective} from './rp-form-group.directive';

@Component({
  template: `
    <form
      [formGroup]="form"
      (rpSubmit)="submit($event)"
      [showErrors]="showErrors"
    ></form>
  `
})
class TestComponent {
  @ViewChild(RpFormGroupDirective) rpFormGroup;

  showErrors = false;

  form = this.fb.group({
    required: [undefined, Validators.required],
  });

  constructor(private fb: FormBuilder) {}

  submit(value) {}
}

describe('RpFormGroupDirective', () => {
  let fixture: ComponentFixture<TestComponent>;
  let testComponent: TestComponent;
  let form: DebugElement;
  let rpFormGroup: RpFormGroupDirective;

  beforeEach(() => {
    // directive = new RpFormGroupDirective();
    TestBed.configureTestingModule({
      imports: [ReactiveFormsModule],
      declarations: [TestComponent, RpFormGroupDirective],
    });

    fixture = TestBed.createComponent(TestComponent);

    testComponent = fixture.componentInstance;

    form = fixture.debugElement.query(By.css('form'));

    rpFormGroup = fixture.componentInstance.rpFormGroup;
  });

  it('should check form validity if "showErrors" input is true', () => {
    spyOn(rpFormGroup, 'catchSubmit');
    fixture.detectChanges();
    expect(rpFormGroup.catchSubmit).not.toHaveBeenCalled();
    testComponent.showErrors = true;
    fixture.detectChanges();
    expect(rpFormGroup.catchSubmit).toHaveBeenCalled();
  });

  it('should emit "submitFail" if formGroup is invalid, "rpSubmit" if not', () => {
    spyOn(rpFormGroup.rpSubmit, 'emit');
    spyOn(rpFormGroup.submitFail, 'emit');

    fixture.detectChanges();
    rpFormGroup.catchSubmit();

    expect(rpFormGroup.formGroup.invalid).toBe(true);
    expect(rpFormGroup.rpSubmit.emit).not.toHaveBeenCalled();
    expect(rpFormGroup.submitFail.emit).toHaveBeenCalled();

    testComponent.form.get('required').patchValue('some value');
    rpFormGroup.catchSubmit();

    expect(rpFormGroup.formGroup.invalid).not.toBe(true);
    expect(rpFormGroup.submitFail.emit).toHaveBeenCalledTimes(1);
    expect(rpFormGroup.rpSubmit.emit).toHaveBeenCalled();
  });

  xit('should react to host "submit" event', () => {});
});
