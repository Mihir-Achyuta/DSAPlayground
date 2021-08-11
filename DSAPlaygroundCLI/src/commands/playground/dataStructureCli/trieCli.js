const prompts = require("prompts");

const { errorHandler } = require("../../../handlers/error/errorHandler");

function trieCli() {
  try {
  } catch (error) {
    errorHandler(error);
  }
}

module.exports = { trieCli };
