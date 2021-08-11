const prompts = require("prompts");

const { playgroundHelp } = require("../help/playgroundHelp");
const { binaryHeapCli } = require("./binaryHeapCli");
const { errorHandler } = require("../../handlers/error/errorHandler");

async function playgroundCli() {
  try {
    let shouldExit = false;
    console.log("Hi");

    while (!shouldExit) {
      const { playgroundResponse } = await prompts({
        type: "text",
        name: "playgroundResponse",
        message:
          "Welcome to the playground. Please enter the data structure playground to enter or enter exit to quit.",
      });

      switch (playgroundResponse) {
        case undefined:
          shouldExit = true;
          break;

        case "exit":
          shouldExit = true;
          break;

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
          binaryHeapCli();
          break;

        case "trie":
          break;

        default:
          errorHandler("Invalid command entered");
      }
    }
  } catch (error) {
    errorHandler(error);
  }
}

module.exports = { playgroundCli };
