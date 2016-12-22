# RpControls

A set of Angular version 2+ form controls.

**Very much a work in progress**

## Building
`npm run build`

## TODO
- [ ] SimpleMDE's styles in build step
- [ ] Remove FontAwesome dependency
- [ ] Light, general styling classes
  - Allow specifying array of themes to pass as classes
  - Default settings.themes = ['Default', 'App'], // `rp-control--default rp-control--app`,
  - Default Theme
    - Error message styling and spacing
    - Error colors
    - Full width inputs
  - FontAwesome Theme?
    - Could make it easy to compose the library into classes
  - Build step or just shared CSS that user uses with `settings.themes = ['default', 'app', 'fa']`
- [ ] Check `<input type="date">` (and others?) compatibility
  - Create new input that uses setter / getter for formatting correctly
  - Firefox doesn't support type="date" and therefore submits the wrong data
  - Is this a validation thing?
- [ ] Support nested `formControlName` on RpFormGroupDirective
  - Address labels aren't working with `formControlName="address"`, but do work with `[formGroup]="form.get('address')"`
- [ ] Controls
  - URLs
  - Date
  - Time?
- [ ] Requiring `href` in Links control prevented form submit, but didn't show any errors
- [ ] Select control tabbable
- [ ] Publish to NPM
