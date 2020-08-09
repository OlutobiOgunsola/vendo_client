const setAlert = (updater, type, text) => {
  updater([{ type, text }]);

  return setTimeout(() => {
    return updater([]);
  }, 5000);
};

export default setAlert;
