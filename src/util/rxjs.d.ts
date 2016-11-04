import * as Observable from 'rxjs/Observable';
import {BehaviorSubject} from 'rxjs/BehaviorSubject';

// TODO I think I need to implement an rxjs.d.ts file so I don't have to import this interface everytime I use BoolToggle
export interface BoolToggleI {
  $: Observable.Observable<boolean>;
  next(x?: boolean): void;
}

export declare const BoolToggle: () => BoolToggleI;
