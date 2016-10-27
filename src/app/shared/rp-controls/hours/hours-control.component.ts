import {Component, Input, Output, EventEmitter, OnInit, OnDestroy} from '@angular/core';
import {FormArray, FormBuilder, FormControl} from '@angular/forms';
import {Subscription} from 'rxjs/Subscription';

@Component({
  selector: 'hours-control',
  template: `
    <label *ngIf="label">{{label}}</label>

    <hour-control *ngFor="let control of form.controls; let index = index" [control]="control">
      <button *ngIf="form.controls.length > 1" (click)="removeAt(index)" class="btn btn--less hour__remove" type="button">Remove</button>
    </hour-control>

    <button (click)="add()" class="btn btn--less" type="button">Add</button>
  `,
})
export class HoursControlComponent implements OnInit, OnDestroy {
  @Input() control = new FormControl();
  @Input() model = [];
  @Input() label: string;
  @Output() modelChange = new EventEmitter();

  private subs: Subscription;
  public form: FormArray = this._fb.array([]);

  constructor(private _fb: FormBuilder) {}

  ngOnInit() {
    const {value} = this.control;

    this.form.patchValue((value || this.model)
      .map(x => this._fb.control(x)));

    if (!this.form.controls.length) this.add(); // Ensure there's at least one item in there

    this.subs = this.form.valueChanges
      .subscribe(x => {
        this.control.patchValue(x);
        this.modelChange.emit(x);
      });
  }

  ngOnDestroy() {
    this.subs.unsubscribe();
  }

  add() {
    this.form.push(this._fb.control({}));
  }

  removeAt(index) {
    this.form.removeAt(index);
  }
}
