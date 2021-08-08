const prompts = require("prompts");

const { playgroundHelp } = require("../help/playgroundHelp");
const { binaryHeapCli } = require("./binaryHeapCli");
const { errorHandler } = require("../../handlers/error/errorHandler");

async function playgroundCli() {
  try {
    let shouldExit = false;

    while (!shouldExit) {
      const { playgroundResponse } = await prompts({
        type: "text",
        name: "playgroundResponse",
        message:
          "Welcome to the playground. Please enter the data structure playground to enter or enter exit to quit.",
      });

      switch (playgroundResponse) {
        case "exit":
          shouldExit = true;
          console.log("exiting");
          break;

        case "help":
          playgroundHelp();
          break;

        case "singly_linked_list":
          break;

        case "doubly_linked_list":
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
