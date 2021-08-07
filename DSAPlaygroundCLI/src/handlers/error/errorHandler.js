const { helpCommands } = require("../../commands/help/helpCommands");

//error handler in case of any bad user input
function errorHandler(message, includeHelpCommand = false) {
  console.error(`Error: ${message}`);
  if (includeHelpCommand) {
    console.log("");
    helpCommands();
  }
}

module.exports = { errorHandler };
