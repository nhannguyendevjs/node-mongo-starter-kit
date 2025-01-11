import { DateTime } from 'luxon';

const datetimeFormat = (...args) => {
  const [value, pattern] = args;
  return DateTime.fromISO(value).toFormat(pattern);
};

export { datetimeFormat };
