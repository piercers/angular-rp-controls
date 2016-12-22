import {Component, forwardRef, Output, EventEmitter, Input, ViewChild, AfterViewInit, OnDestroy} from '@angular/core';
import {ControlValueAccessor, NG_VALUE_ACCESSOR} from '@angular/forms';
import SimpleMDE from 'simplemde';

@Component({
  selector: 'rp-textarea-control',
  providers: [{
    provide: NG_VALUE_ACCESSOR,
    useExisting: forwardRef(() => RpTextareaControlComponent),
    multi: true,
  }],
  template: `
    <rp-control
      [value]="value"
      [label]="label"
      [hasFocus]="hasFocus"
      [touched]="touched"
    >
      <textarea
        #rpControlInput
        (input)="onInput($event.target.value)"
        (focus)="hasFocus = true"
        (blur)="onBlur()"
        [placeholder]="placeholder"
      >{{value}}</textarea>
    </rp-control>
  `,
})
export class RpTextareaControlComponent implements ControlValueAccessor, AfterViewInit, OnDestroy {
  @Input() label: string;

  @Input() placeholder = '';

  @Input() rte = true;

  @Output() change = new EventEmitter();

  @ViewChild('rpControlInput') textarea;

  hasFocus = false;

  touched = false;

  value: string;

  editor: SimpleMDE;

  onChange = (x?: any) => {};

  onTouched = () => {};

  ngAfterViewInit() {
    if (this.rte) {
      this.editor = new SimpleMDE({
        element: this.textarea.nativeElement,
      });

      this.editor.codemirror.on('change', () => {
        this.onInput(this.editor.value());
      });
    }
  }

  ngOnDestroy() {
    if (this.rte) {
      this.editor.toTextArea();
      this.editor = null;
    }
  }

  onInput(value) {
    this.value = value;
    this.onChange(value);
  }

  onBlur() {
    this.hasFocus = false;
    this.touched = true;
    this.onTouched();
  }

  writeValue(value) {
    this.value = value;
  }

  registerOnChange(fn) {
    this.onChange = fn;
  }

  registerOnTouched(fn) {
    this.onTouched = fn;
  }
}
