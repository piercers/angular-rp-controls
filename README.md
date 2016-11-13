# RpControls

A set of Angular version 2+ form controls.

**Very much a work in progress**

## Building
`npm run build`

## TODO
- [ ] Select control tabbable
- [ ] Publish to NPM
- [ ] Support nested `formControlName` on RpFormGroupDirective
- [ ] Check `<input type="date">` (and others?) compatibility
  - Firefox doesn't support type="date" and therefore submits the wrong data
  - Is this a validation thing?
  - Does it actually need to "check" for compatibility and instead check on blur if it's 24h time?
