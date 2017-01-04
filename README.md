# RpControls

A set of Angular version 2+ form controls.

**Very much a work in progress**

## Building
`npm run build`

## TODO
- [ ] SimpleMDE's styles in build step
- [ ] Check `<input type="date">` (and others?) compatibility
  - Create new input that uses setter / getter for formatting correctly
  - Firefox doesn't support type="date" and therefore submits the wrong data
  - Is this a validation thing?
- [ ] Requiring `href` in Links control prevented form submit, but didn't show any errors
- [ ] Select control tabbable
- [ ] Publish to NPM
