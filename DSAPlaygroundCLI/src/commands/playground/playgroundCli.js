const prompts = require("prompts");

const { playgroundHelp } = require("../help/playgroundHelp");
const { binaryHeapCli } = require("./binaryHeapCli");
const { errorHandler } = require("../../handlers/error/errorHandler");

async function playgroundCli() {
  let shouldExit = false;

  while (!shouldExit) {
    const { playgroundResponse } = await prompts({
      type: "text",
      name: "playgroundResponse",
      message:
        "Welcome to the playground. Please enter the data structure playground to enter or enter help for all the commands",
    });

    switch (playgroundResponse) {
      case undefined:
        return true;

      case "exit":
        return true;

      case "back_home":
        return false;

      case "help":
        playgroundHelp();
        break;

      case "stack":
        break;

      case "queue":
        break;

      case "binary_search_tree":
        break;

      case "binary_heap":
        shouldExit = await binaryHeapCli();
        break;

      case "trie":
        break;

      default:
        errorHandler("Invalid command entered");
    }
  }
}

module.exports = { playgroundCli };
