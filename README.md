# RpControls

A set of Angular version 2+ form controls.

**Very much a work in progress**

## Building
`npm run build`

## TODO
- [ ] Password Confirm field
- [ ] Bug: `<rp-input-control type="password"></rp-input-control>` has a value of `undefined`
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
- [ ] RpToggleControlComponent?
- [ ] RpUiModule

### IDEA
What benefit do FormControls have here? Might be more trouble than they're worth.
