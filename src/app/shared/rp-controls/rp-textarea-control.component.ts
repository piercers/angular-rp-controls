import {
  Component,
  ViewChild,
  ContentChildren,
  Input,
  OnInit,
  AfterViewInit,
  OnDestroy,
} from '@angular/core';
import {FormControl, AbstractControl, FormGroup, ControlValueAccessor} from '@angular/forms';
import SimpleMDE from 'simplemde';
import {Subject} from 'rxjs/Subject';
import {ReplaySubject} from 'rxjs/ReplaySubject';

import {provideValueAccessor} from './util/ng';
import {RpFormGroupDirective} from './rp-form-group.directive';
import {RpControlErrorDirective} from './rp-control-error.directive';

@Component({
  selector: 'rp-textarea-control',
  providers: [
    provideValueAccessor(RpTextareaControlComponent),
  ],
  styles: [`
    :host {
      display: block;
    }

    label {
      display: block;
    }

    textarea {
      width: 100%;
    }
 `],
  template: `
    <rp-input-control
      [control]="control"
      [label]="label"
      (id)="id = $event"
      [labelUp]="true"
      [errorMessages]="_contentErrors"
    >
      <textarea
        #textarea
        #inputControlInput
        [placeholder]="placeholder"
        [id]="id"
        (input)="onChange($event.target.value)"
        (blur)="onTouch()"
        class="input-control"
      >{{value}}</textarea>
    </rp-input-control>
  `,
})
export class RpTextareaControlComponent implements ControlValueAccessor, OnInit, AfterViewInit, OnDestroy {
  @Input() label: string;
  @Input() placeholder = '';
  @Input() rte = true;
  @Input() formControlName: string;
  @Input() formControl: AbstractControl;

  @ViewChild('textarea') textarea;

  @ContentChildren(RpControlErrorDirective) contentErrors;

  public editor: SimpleMDE;

  private onDestroy = new Subject();

  public _contentErrors = new ReplaySubject(1);

  public value = '';

  private form: FormGroup;

  public control: AbstractControl;

  public onTouch = () => {};

  public onChange = (x: any) => {}

  constructor(private rpFormGroup: RpFormGroupDirective) {}

  ngOnInit() {
    this.form = this.rpFormGroup.form;

    this.control = this.formControl || this.form.get(this.formControlName) || new FormControl();
  }

  ngAfterViewInit() {
    this.contentErrors.changes
      .startWith(this.contentErrors)
      .takeUntil(this.onDestroy)
      .subscribe(x => this._contentErrors.next(x.toArray()))

    if (this.rte) {
      this.editor = new SimpleMDE({
        element: this.textarea.nativeElement,
      });

      this.editor.codemirror.on('change', () => {
        this.onChange(this.editor.value());
      });
    }
  }

  ngOnDestroy() {
    if (this.rte) {
      this.editor.toTextArea();
      this.editor = null;
    }

    this.onDestroy.next();
  }

  writeValue(value) {
    if (value !== undefined) {
      this.value = value;
    }
  }

  registerOnChange(fn) {
    this.onChange = fn;
  }

  registerOnTouched(fn) {
    this.onTouch = fn;
  }
}
