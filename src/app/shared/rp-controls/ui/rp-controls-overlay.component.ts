import {Component, ChangeDetectionStrategy, Input, OnChanges, OnInit, SimpleChanges} from '@angular/core';

@Component({
  selector: 'rp-controls-overlay',
  styles: [`
    :host.is-shown {
      position: fixed;
      top: 0;
      right: 0;
      bottom: 0;
      left: 0;
      z-index: 1;
    }
  `],
  host: {
    '[class.is-shown]': 'open',
    '[style.background-color]': 'color',
    '[style.opacity]': 'opacity',
  },
  template: ``,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class RpControlsOverlayComponent implements OnChanges, OnInit {
  @Input() open = false;
  @Input() opacity = .66;
  @Input() color = 'white';
  @Input() overlayClass = 'is-open';

  private bodyEl;

  ngOnChanges({open}: SimpleChanges) {
    if (open) this.toggleBodyClass(open.currentValue);
  }

  ngOnInit() {
    if (document) {
      this.bodyEl = document.querySelector('body');
    }
  }

  toggleBodyClass(isOpen) {
    if (this.bodyEl) {
      if (isOpen) {
        this.bodyEl.classList.add(this.overlayClass);
      } else {
        this.bodyEl.classList.remove(this.overlayClass);
      }
    }
  }
}
