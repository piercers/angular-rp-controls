import {Directive, Input} from '@angular/core';

@Directive({
  selector: 'rp-control-error',
})
export class RpControlErrorDirective {
  @Input() type: string;
  @Input() message: string;
}
