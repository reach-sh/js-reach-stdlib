const processShim = (() => {
  try {
    return process;
  } catch (e) {
    // ReferenceError
    return {
      env: {
        // XXX: figure out how to handle this stuff better
        REACH_CONNECTOR_MODE: 'ETH-browser',
      },
      stdout: {
        write: () => {},
      },
    };
  }
})();
const windowShim = (() => {
  try {
    // @ts-ignore
    return window;
  } catch (e) {
    // ReferenceError
    return {};
  }
})();
export { processShim as process, windowShim as window };
