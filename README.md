# RpControls

A set of Angular version 2+ form controls.

**Very much a work in progress**

## Building
`npm run build`

## TODO
- [ ] Check `<input type="date">` (and others?) compatibility
  - Create new input that uses setter / getter for formatting correctly
  - Firefox doesn't support type="date" and therefore submits the wrong data
  - Is this a validation thing?
- [ ] `input="time"` validation and standardization
- [ ] Min / Max on `type="number"`
- [ ] URL formatting on `type="url"`?
  - Not sure how valuable this will be
  - Could at least check for spaces and special characters
- [ ] Validation and standardization of `type="tel"`
- [ ] `RpControlsSettingsService` colors (and other settings?) aren't working
  - Colors are most important
- [ ] SimpleMDE's styles in build step
- [ ] Requiring `href` in Links control prevented form submit, but didn't show any errors
- [ ] Select control tabbable
