import {Component, ViewChild, Input, ChangeDetectionStrategy, AfterViewInit, OnDestroy} from '@angular/core';
import {FormControl} from '@angular/forms';
import SimpleMDE from 'simplemde';

@Component({
  selector: 'textarea-control',
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
    <input-control [control]="control" [label]="label" (id)="id = $event" [labelUp]="true">
      <textarea
        #textarea
        #inputControlInput
        [formControl]="control"
        [placeholder]="placeholder"
        [id]="id"
        class="input-control"
      ></textarea>
    </input-control>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TextareaControlComponent implements AfterViewInit, OnDestroy {
  @Input() control = new FormControl();
  @Input() label: string;
  @Input() placeholder = '';
  @Input() rte = true;
  @ViewChild('textarea') textarea;

  public editor: SimpleMDE;

  ngAfterViewInit() {
    if (this.rte) {
      this.editor = new SimpleMDE({
        element: this.textarea.nativeElement,
      });

      this.editor.codemirror.on('change', () => {
        this.control.patchValue(this.editor.value());
      });
    }
  }

  ngOnDestroy() {
    if (this.rte) {
      this.editor.toTextArea();
      this.editor = null;
    }
  }
}
