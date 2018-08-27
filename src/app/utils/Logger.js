// CHANGE FOR YOUR LOG PLAYER AS WINSTON FOR EXAMPLE
const Logger = {
  error(message) {
    console.log(`ERROR[${message}]`);
  },
  warn(message) {
    console.log(`WARN[${message}]`);
  },
  info(message) {
    console.log(`INFO[${message}]`);
  },
};

module.exports = Logger;
