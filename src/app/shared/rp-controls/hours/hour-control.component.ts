import {Component, OnInit, OnDestroy, Input} from '@angular/core';
import {FormGroup, FormBuilder, FormControl} from '@angular/forms';
import {Subscription} from 'rxjs/Subscription';

/**
 * Component to select days of the week with start and end times
 */
@Component({
  selector: 'hour-control',
  styles: [`
    .hour {
      display: flex;
    }

    .hour > * {
      flex-grow: 1;
    }
  `],
  template: `
    <div [formGroup]="form" class="hour">
      <days-control [control]="form.get('days')"></days-control>

      <time-control label="Start" [control]="form.get('start')"></time-control>

      <time-control label="End" [control]="form.get('end')"></time-control>
    </div>
    <ng-content></ng-content>
  `,
})
export class HourControlComponent implements OnInit, OnDestroy {
  @Input() control = new FormControl();

  private subs: Subscription;
  public form: FormGroup = this._fb.group({
    days: [[]],
    start: [''],
    end: [''],
  });

  constructor(private _fb: FormBuilder) {}

  ngOnInit() {
    const {value = {}} = this.control;

    this.form.patchValue(value);

    this.subs = this.form.valueChanges
      .subscribe(x => this.control.patchValue(x));
  }

  ngOnDestroy() {
    this.subs.unsubscribe();
  }
}
