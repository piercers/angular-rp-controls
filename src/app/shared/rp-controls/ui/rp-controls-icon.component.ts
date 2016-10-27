import {
  Component,
  ChangeDetectionStrategy,
  Input,
} from '@angular/core';

@Component({
  selector: 'rp-controls-icon',
  template: `
    <span [ngSwitch]="family" class="rp-controls-icon {{family}}">
      <template ngSwitchCase="fontAwesome">
        <i class="fa fa-{{name}}"></i>
      </template>
    </span>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class RpControlsIconComponent {
  @Input() name: string;
  @Input() family = 'fontAwesome';
}
