import {Component} from '@angular/core';
import {By} from '@angular/platform-browser';
import {ReactiveFormsModule, FormControl} from '@angular/forms';
import {TestBed, ComponentFixture, async} from '@angular/core/testing';

import {RpControlsModule} from './rp-controls.module';
import {RpRadiosControlComponent} from './rp-radios-control.component';

@Component({
  template: `
    <rp-radios-control [formControl]="control">
      <rp-option *ngFor="let x of options" [label]="x.name" [value]="x.id"></rp-option>
    </rp-radios-control>
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
      name: 'Nas',
      id: 2,
    },
    {
      name: 'Andre',
      id: 3000,
    },
  ];
}

describe('RpRadiosControlComponent', () => {
  const value = 2;
  let fixture: ComponentFixture<TestComponent>;
  let testComponent: TestComponent;
  let component: RpRadiosControlComponent;

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

    component = fixture.debugElement.query(By.directive(RpRadiosControlComponent))
      .injector.get(RpRadiosControlComponent);
  });

  it('should display a label within a <legend> if given', () => {
    const label = 'Ryan Radios';
    const noLegend = fixture.debugElement.query(By.css('legend'));
    expect(noLegend).toBeFalsy();
    component.label = label;
    fixture.detectChanges();
    const legend = fixture.debugElement.query(By.css('legend'));
    expect(legend.nativeElement.tagName).toBe('LEGEND');
    expect(legend.nativeElement.textContent).toBe(label);
  });

  it('should output "changes" with new value', async(() => {
    component.changes.subscribe(x => expect(x).toBe(value));
    component.select(value);
  }));

  it('should handle its "touched" state on select', () => {
    spyOn(component, 'onTouched');
    expect(component.touched).toBe(false);
    component.select(value);
    expect(component.touched).toBe(true);
    expect(component.onTouched).toHaveBeenCalled();
  });

  it('should select a value', () => {
    expect(component.selected).not.toBe(value);
    component.select(value);
    expect(component.selected).toBe(value);
  });

  it('should get its options from element children', () => {
    fixture.detectChanges();
    expect(component.options.length).toBe(testComponent.options.length);
  });

  it('should write a value based on the "value" input', () => {
    spyOn(component, 'writeValue');
    component.value = value;
    fixture.detectChanges();
    expect(component.writeValue).toHaveBeenCalledWith(value);
  });
});
