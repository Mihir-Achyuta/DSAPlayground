const {
  welcomeHelp,
  playgroundHelp,
  binaryHeapHelp,
  binarySearchTreeHelp,
  queueHelp,
  stackHelp,
  trieHelp,
} = require("../../commands/help/helpCommands");

//error handler in case of any bad user input
function errorHandler(message, includeHelpCommand = null) {
  console.error(`Error: ${message}`);
  if (includeHelpCommand) {
    switch (includeHelpCommand) {
      case "welcome":
        welcomeHelp();
        break;

      case "playground":
        playgroundHelp();
        break;

      case "heap":
        binaryHeapHelp();
        break;

      case "bst":
        binarySearchTreeHelp();
        break;

      case "queue":
        queueHelp();
        break;

      case "stack":
        stackHelp();
        break;

      case "trie":
        trieHelp();
        break;

      default:
        break;
    }
  }
}

module.exports = { errorHandler };
