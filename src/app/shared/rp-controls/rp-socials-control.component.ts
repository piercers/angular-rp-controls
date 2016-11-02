import {Component, Input, OnInit, OnDestroy} from '@angular/core';
import {FormGroup, FormArray, FormBuilder, FormControl} from '@angular/forms';
import {Subscription} from 'rxjs/Subscription';

@Component({
  selector: 'rp-socials-control',
  template: `
    <div *ngFor="let group of form.controls" [formGroup]="group">
      <label *ngIf="label">{{label}}</label>

      <rp-select-control label="Network" formControlName="network">
        <rp-option *ngFor="let option of options" [value]="option.value" [label]="option.label"></rp-option>
      </rp-select-control>

      <rp-text-control label="Link" formControlName="link"></rp-text-control>
    </div>
  `,
})
export class SocialsControlComponent implements OnInit, OnDestroy {
  @Input() control = new FormControl();
  @Input() label: string;

  private subs: Subscription;
  public options = [
    {
      label: 'Instagram',
      value: 'instagram',
    },
    {
      label: 'Facebook',
      value: 'facebook',
    },
    {
      label: 'Twitter',
      value: 'twitter',
    },
  ];
  public form: FormArray = this.fb.array([]);
  public socialControl: FormGroup = this.fb.group({
    network: [''],
    link: [''],
  });

  constructor(private fb: FormBuilder) {}

  ngOnInit() {
    this.control.value.map(control => this.form.push(this.fb.group(control)));

    this.form.patchValue(this.control.value || []);

    this.subs = this.form.valueChanges
      .do(form => this.control.patchValue(form))
      .subscribe();
  }

  ngOnDestroy() {
    this.subs.unsubscribe();
  }
}
