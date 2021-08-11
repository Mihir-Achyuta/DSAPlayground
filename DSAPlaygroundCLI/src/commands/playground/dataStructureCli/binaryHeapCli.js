const prompts = require("prompts");

const { binaryHeapHelp } = require("../../help/helpCommands");
const { errorHandler } = require("../../../handlers/error/errorHandler");

async function binaryHeapCli() {
  while (true) {
    const { heapResponse } = await prompts({
      type: "text",
      name: "heapResponse",
      message: `Welcome to the heap playground. Please enter the data structure playground to enter or enter help for all the commands`,
    });

    switch (heapResponse) {
      case undefined:
        return "exit";

      case "exit":
        return "exit";

      case "back_playground":
        return false;

      case "help":
        binaryHeapHelp();
        break;

      default:
        errorHandler("Invalid command entered", "heap");
    }
  }
}

module.exports = { binaryHeapCli };
