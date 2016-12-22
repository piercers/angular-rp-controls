export default {
  entry: './dist/index.js',
  dest: './dist/bundles/rp-controls.umd.js',
  format: 'umd',
  moduleName: 'rp.controls',
  globals: {
    '@angular/core': 'ng.core',
    '@ngrx/core': 'ngrx.core',
    'rxjs/Observable': 'Rx',
    'rxjs/BehaviorSubject': 'Rx',
    'rxjs/Subscriber': 'Rx',
    'rxjs/scheduler/queue': 'Rx.Scheduler',
    'rxjs/operator/observeOn': 'Rx.Observable.prototype',
    'rxjs/operator/scan': 'Rx.Observable.prototype',
    'rxjs/operator/withLatestFrom': 'Rx.Observable'
  }
}
