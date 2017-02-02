import {filter, flow, head, join, map, mapValues, reject, split, toLower, toString} from 'lodash/fp';

/**
 * Parse time string to determine if it's AM or PM
 */
const getPeriod = flow(
  toLower,
  filter(x => /^[a|p]+$/i.test(x)), // Only allow letters 'a' or 'p'
  head // Don't care about the 'm' of 'AM' / 'PM'
);

/**
 * Parse apart a time string into hours and minutes
 */
const getHourMinute = flow( // ({}): {}
  split(':'),
  map(flow( // ([]): []
    reject(x => /^[a-z]+$/i.test(x)), // Remove any letters
    join(''),
    x => parseInt(x, 10),
  )),
  ([hour, minute]) => ({hour, minute})
);

/**
 * Ensure a string has at least two digits
 */
const addZeroes = (x = '') => x.length >= 2 ? x : addZeroes(0 + x);

/**
 * Convert a time object to string
 */
const formatTime = flow( // ({}): ''
  mapValues(flow(toString, addZeroes)),
  ({hour, minute}) => hour === 'NaN' || minute === 'NaN' ? '' : `${hour}:${minute}`
);

/**
 * Accepts a time string and formats it to 24hour time
 */
export const parseTime = flow( // (''): ''
  (time = '') => { // (''): {}
    const period = getPeriod(time);
    const {hour, minute} = getHourMinute(time);

    if (period === 'a' && hour === 12) {
      return {hour: 0, minute};
    }

    if (period === 'p' && hour !== 12 && hour < 12) {
      return {hour: hour + 12, minute};
    }

    return {hour, minute};
  },
  formatTime
);
