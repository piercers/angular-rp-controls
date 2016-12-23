import {RpControlsSettingsService as Service} from './rp-controls-settings.service';

describe('RpControlsSettingsService', () => {
  it('should have default settings', () => {
    expect(new Service({}).colors.primary).toBeDefined();
  });

  it('should merge custom settings', () => {
    const original = new Service({}).colors.primary;
    const overridden = new Service({colors: {primary: 'different color'}}).colors.primary;
    expect(overridden).not.toBe(original);
  });
});
