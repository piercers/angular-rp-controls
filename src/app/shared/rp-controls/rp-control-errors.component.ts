import {
  Component,
  Input,
  SimpleChanges,
  OnChanges,
  OnInit,
  OnDestroy,
} from '@angular/core';
import {Observable} from 'rxjs/Observable';
import {Subject} from 'rxjs/Subject';
import {ReplaySubject} from 'rxjs/ReplaySubject';
import 'rxjs/add/operator/combineLatest';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/startWith';

import {RpControlsSettings} from './rp-controls-settings.service';
import {RpFormGroupDirective} from './rp-form-group.directive';
import {RpControlErrorDirective} from './rp-control-error.directive';

@Component({
  selector: 'rp-control-errors',
  styles: [`
    :host {
      display: block;
      min-height: .93rem;
      margin-bottom: .2rem;
    }

    .control-errors__message {
      font-size: .85rem;
    }
  `],
  template: `
    <div *ngIf="(showErrors|async) || touched">
      <div *ngFor="let error of errors|async" [style.color]="color" class="control-errors__message">{{error}}</div>
    </div>
  `,
})
export class RpControlErrorsComponent implements OnChanges, OnInit, OnDestroy {
  @Input('errors') errorsInput: any;
  @Input() touched: boolean;
  @Input() messages: Observable<RpControlErrorDirective[]>;
  @Input() color = this.settings.colors.error || 'red';

  private onDestroy = new Subject();

  private errorMessagesSubject = new ReplaySubject(1);

  private errorMessages = this.errorMessagesSubject
    .startWith(new Map([
      ['required', 'Field is required.'],
      ['minlength', 'Minimum length not met.'],
      ['maxlength', 'Too long.'],
    ]))
    .scan((map: Map<string, string>, messages: any[]) => {
      messages.forEach(({type, message}) => map.set(type, message));
      return map;
    });

  private errorsSubject = new ReplaySubject(1);

  public errors = this.errorsSubject
    .combineLatest(this.errorMessages)
    .map(([err, messages]: [Object, Map<string, string>]) => Object.keys(err).map(x => messages.get(x) || x));

  public showErrors = this.rpFormGroup.isShowingErrors.$;

  constructor(private settings: RpControlsSettings, private rpFormGroup: RpFormGroupDirective) {}

  ngOnChanges({errorsInput}: SimpleChanges) {
    if (errorsInput) this.errorsSubject.next(errorsInput.currentValue || {});
  }

  ngOnInit() {
    if (this.messages) {
      this.messages
        .takeUntil(this.onDestroy)
        .subscribe(x => this.errorMessagesSubject.next(x));
    }
  }

  ngOnDestroy() {
    this.onDestroy.next();
  }
}
