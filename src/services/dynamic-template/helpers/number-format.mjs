import numfmt from 'numfmt';

const numberFormat = (...args) => {
  const [value, pattern] = args;
  const result = numfmt.format(pattern, value);
  return result;
};

export { numberFormat };
