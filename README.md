# RpControls

A set of Angular version 2+ form controls.

**Very much a work in progress**

## Building
`npm run build`

## TODO
- [ ] Select control tabbable
- [ ] Ensure `(change)` works on all controls
	- Is this needed if we can use `ngModelChange`?
- [ ] Publish to NPM
- [ ] Support nested `formControlName` on RpFormGroupDirective
- [ ] Check `<input type="date">` (and others?) compatibility
  - Firefox doesn't support type="date" and therefore submits the wrong data
  - Is this a validation thing?
  - Does it actually need to "check" for compatilibity and instead check on blur if it's 24h time?
- [ ] Remove RpAddressControl?
  - Each app seems to have different requirements, field names, etc
  - It's real easy to make each time you need it
  - More of an app control, not RP control
  - Also remove RpHoursControl?
