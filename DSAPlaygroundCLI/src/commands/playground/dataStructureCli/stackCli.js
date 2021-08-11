const prompts = require("prompts");

const { errorHandler } = require("../../../handlers/error/errorHandler");

function stackCli() {
  try {
  } catch (error) {
    errorHandler(error);
  }
}

module.exports = { stackCli };
