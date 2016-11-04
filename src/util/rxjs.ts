import * as Observable from 'rxjs/Observable';
import {BehaviorSubject} from 'rxjs/BehaviorSubject';
import 'rxjs/add/operator/scan';

// TODO I think I need to implement an rxjs.d.ts file so I don't have to import this interface everytime I use BoolToggle
export interface BoolToggleI {
  $: Observable.Observable<boolean>;
  next(x?: boolean): void;
}

export const BoolToggle = () => {
  const subject = new BehaviorSubject(false);

  return Object.freeze({
    next: (x?: boolean) => subject.next(x),
    $: subject.scan((editing, force) => force !== undefined ? force : !editing),
  });
};
