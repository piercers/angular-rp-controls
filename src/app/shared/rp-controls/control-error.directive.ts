import {Directive, Input} from '@angular/core';

@Directive({
  selector: 'control-error',
})
export class ControlErrorDirective {
  @Input() type;
  @Input() message;
}
