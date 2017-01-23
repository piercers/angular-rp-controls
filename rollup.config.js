// See https://medium.com/@cyrilletuzi/how-to-build-and-publish-an-angular-module-7ad19c0b4464#.3jw346qrd
export default {
  entry: './dist/index.js',
  dest: './dist/bundles/rp-controls.umd.js',
  sourceMap: false,
  format: 'umd',
  moduleName: 'rp.controls',
  globals: {
    '@angular/common': 'ng.common',
    '@angular/core': 'ng.core',
    '@angular/forms': 'ng.forms',
    '@ngrx/core': 'ngrx.core',
    'rxjs/BehaviorSubject': 'Rx',
    'rxjs/Observable': 'Rx',
    'rxjs/ReplaySubject': 'Rx',
    'rxjs/add/operator/do': 'Rx.Observable',
    'rxjs/add/operator/map': 'Rx.Observable',
    'rxjs/add/operator/startWith': 'Rx.Observable',
    'lodash': '_',
    'lodash/fp': '_',
    'simplemde': 'SimpleMDE'
  }
}
