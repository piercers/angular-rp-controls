import * as Observable from 'rxjs/Observable';
import {BehaviorSubject} from 'rxjs/BehaviorSubject';
import 'rxjs/add/operator/scan';

export const BoolToggle = () => {
  const subject = new BehaviorSubject(false);

  return Object.freeze({
    next: (x?: boolean) => subject.next(x),
    $: <Observable.Observable<boolean>>subject.scan((editing, force) => force !== undefined ? force : !editing),
  });
};
