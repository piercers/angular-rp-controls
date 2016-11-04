import {Directive, Input, OnInit} from '@angular/core';

@Directive({
  selector: 'rp-option',
})
export class RpOptionDirective implements OnInit {
  @Input() value: any;
  @Input() label: string;

  ngOnInit() {
    this.label = this.label || this.value;
  }
}
