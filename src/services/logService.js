function init() {}

function log(error) {
  console.error(error);
}

const logger = {
  init: init,
  log: log,
};

export default logger;
