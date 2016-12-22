import {
  Component,
  Input,
  Optional,
  OnInit,
} from '@angular/core';
import {FormArrayName, FormArray} from '@angular/forms';

// TODO Query for formArrayName, formGroup; rpFormArray input only supplements this
@Component({
  selector: 'rp-form-array-label',
  styles: [`
  `],
  template: `
    <div *ngIf="title" class="rp-controls__label">{{title}}</div>

    <button [rpFormArrayAdd]="array" type="button">{{buttonText}}</button>
  `,
})
export class RpFormArrayLabelComponent implements OnInit {
  @Input() title: string;
  @Input() itemName: string;
  @Input('array') inputArray: FormArray;

  public array: FormArray;

  constructor(@Optional() private formArray: FormArrayName) {}

  ngOnInit() {
    this.array = this.inputArray || this.formArray.control;
  }

  get buttonText() {
    return this.itemName ? `+${this.itemName}` : '+';
  }
}
