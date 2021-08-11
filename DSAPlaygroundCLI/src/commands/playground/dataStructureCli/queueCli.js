const prompts = require("prompts");

const { errorHandler } = require("../../../handlers/error/errorHandler");

function queueCli() {
  try {
  } catch (error) {
    errorHandler(error);
  }
}

module.exports = { queueCli };
