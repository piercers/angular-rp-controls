import * as Moment from 'moment';
import {curry, includes} from 'lodash/fp';

const hourPieces = (hour = '') => {
  const pieces = hour.split(':');
  return {hour: pieces[0], minutes: pieces[1]};
};

const nextTime = curry((moment, {days = [], start = '', end}) => {
  const day = moment.day(); // Get day of week
  const hasToday = includes(day, days); // Check if day of week is include in days array
  const {hour, minutes} = hourPieces(start); // Split apart 24 hour time
  const timeStart = Moment(moment) // Create moment for given time's start
    .day(day)
    .hour(+hour)
    .minutes(+minutes)
    .seconds(0)
    .milliseconds(0);

  if (hasToday && moment.isBefore(timeStart)) { // Found time is "next" if starting moment is before timeStart
    return timeStart;
  } else { // Otherwise, check the next day, starting from 0:00
    const tomorrow = Moment(moment).add(1, 'day').startOf('day');
    return nextTime(tomorrow, {days, start, end}); // Run function again until conditions are met
  }
});

export const nextTimes = curry((moment, time, count, recurse = []) => {
  if (recurse.length < count) {
    const next = nextTime(moment, time);
    return nextTimes(next, time, count, [...recurse, next]);
  } else {
    return recurse;
  }
});
