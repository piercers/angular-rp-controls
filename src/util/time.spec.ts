import {parseTime} from './time';

describe('Parse Time', () => {
  it('should not format 24h time.', () => {
    expect(parseTime('23:00')).toEqual('23:00');
  });

  it('should convert 12am to "00:00"', () => {
    expect(parseTime('12am')).toEqual('00:00');
  });

  it('should ensure there are leading zeroes.', () => {
    expect(parseTime('2:00')).toEqual('02:00');
  });

  it('should convert 12 hour time to 24 hour.', () => {
    expect(parseTime('3:05 PM')).toEqual('15:05');
  });

  it('should assume 24 hour time if no am/pm.', () => {
    expect(parseTime('9')).toEqual('09:00');
  });

  it('should require minutes if ":" is entered.', () => {
    expect(parseTime('24:')).toEqual('');
  });

  it('should handle midnight.', () => {
    expect(parseTime('12:30a')).toEqual('00:30');
  });

  it('should allow resetting.', () => {
    expect(parseTime('')).toEqual('');
  });
});
