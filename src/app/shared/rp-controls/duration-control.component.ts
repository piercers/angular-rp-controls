import {Component, Input, Output, SimpleChanges, OnChanges, OnInit, OnDestroy} from '@angular/core';
import {FormGroup, FormControl, FormBuilder, Validators} from '@angular/forms';
import {entries} from 'lodash/fp';
import {Subscription} from 'rxjs/Subscription';

@Component({
  selector: 'duration-control',
  styles: [`
    .duration {
      display: flex;
      flex-wrap: wrap;
    }

    .duration > * {
      flex-grow: 1;
    }

    label {
      flex-basis: 100%;
    }
  `],
  template: `
    <div [formGroup]="form" class="duration">
      <label *ngIf="label">{{label}}</label>

      <number-control label="Amount" [control]="form.get('amount')"></number-control>

      <select-control label="Units" [control]="form.get('units')" [placeholder]="placeholder">
        <select-option *ngFor="let unit of units" [label]="unit[1]" [value]="unit[0]"></select-option>
      </select-control>
    </div>
  `,
})
export class DurationControlComponent implements OnChanges, OnInit, OnDestroy {
  @Input() control = new FormControl();
  @Input() label: string;
  @Input() placeholder: string;
  @Input() units = {};
  @Input() min; // TODO Implement (Need on number-control)
  @Input() max; // TODO Implement (Need on number-control)

  private sub: Subscription;
  public form: FormGroup = this._fb.group({
    amount: ['', Validators.required],
    units: ['', Validators.compose([
      Validators.required,
      // Validators.min(0), // TODO Implement min="0" validator
    ])],
  });

  constructor(private _fb: FormBuilder) {}

  ngOnChanges({units}: SimpleChanges) {
    if (units) this.units = entries(units.currentValue);
  }

  ngOnInit() {
    this.form.patchValue(this.control.value || {});

    this.sub = this.form.valueChanges
      .subscribe(x => this.control.patchValue(x));
  }

  ngOnDestroy() {
    this.sub.unsubscribe();
  }
}
