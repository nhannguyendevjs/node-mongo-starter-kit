const tryCatch = ({ tryFn, catchFn }) => {
  try {
    return tryFn();
  } catch (error) {
    return catchFn(error);
  }
};

const tryCatchAsync = async ({ tryFn, catchFn }) => {
  try {
    return await tryFn();
  } catch (error) {
    return await catchFn(error);
  }
};

export { tryCatch, tryCatchAsync };
