import {Directive, Input, OnInit} from '@angular/core';

@Directive({
  selector: 'select-option',
})
export class SelectOptionDirective implements OnInit {
  @Input() value: any;
  @Input() label: string;

  ngOnInit() {
    this.label = this.label || this.value;
  }
}
