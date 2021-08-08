const { welcomeHelp } = require("../../commands/help/helpCommands");

//error handler in case of any bad user input
function errorHandler(message, includeHelpCommand = false) {
  console.error(`Error: ${message}`);
  if (includeHelpCommand) {
    console.log("");
    welcomeHelp();
  }
}

module.exports = { errorHandler };
