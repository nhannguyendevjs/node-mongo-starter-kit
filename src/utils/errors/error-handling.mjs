const runFnInTryCatch = (fn, ...args) => {
  try {
    const data = fn(...args);
    return {
      success: true,
      data,
    };
  } catch (err) {
    return {
      error: true,
      message: err?.message,
    };
  }
};

const runFnInTryCatchAsync = async (fn, ...args) => {
  try {
    const data = await fn(...args);
    return {
      success: true,
      data,
    };
  } catch (err) {
    return {
      error: true,
      message: err?.message,
    };
  }
};

export { runFnInTryCatch, runFnInTryCatchAsync };
