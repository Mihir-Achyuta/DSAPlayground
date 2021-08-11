const prompts = require("prompts");

const { playgroundHelp } = require("../help/interfaceHelp/playgroundHelp");

const { binaryHeapCli } = require("./dataStructureCli/binaryHeapCli");
const {
  binarySearchTreeCli,
} = require("./dataStructureCli/binarySearchTreeCli");
const { queueCli } = require("./dataStructureCli/queueCli");
const { stackCli } = require("./dataStructureCli/stackCli");
const { trieCli } = require("./dataStructureCli/trieCli");

const { errorHandler } = require("../../handlers/error/errorHandler");

async function playgroundCli() {
  let shouldExit = false;
  let result;

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
        shouldExit = await stackCli();
        break;

      case "queue":
        result = await queueCli();

        if (result === "exit") return true;
        shouldExit = result;
        break;

      case "binary_search_tree":
        shouldExit = await binarySearchTreeCli();
        break;

      case "binary_heap":
        result = await binaryHeapCli();

        if (result === "exit") return true;
        shouldExit = result;
        break;

      case "trie":
        shouldExit = await trieCli();
        break;

      default:
        errorHandler("Invalid command entered", "playground");
    }
  }
}

module.exports = { playgroundCli };
