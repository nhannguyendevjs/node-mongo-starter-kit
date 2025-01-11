import { format } from 'numfmt';

const numberFormat = (...args) => {
  const [value, pattern] = args;
  const result = format(pattern, value);
  return result;
};

export { numberFormat };
