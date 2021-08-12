const prompts = require("prompts");
const axios = require("axios");

const { binaryHeapHelp } = require("../../help/helpCommands");
const { errorHandler } = require("../../../handlers/error/errorHandler");

async function binaryHeapCli() {
  const heapCommandNeeded = (heapResponse) => {
    if (
      heapResponse === undefined ||
      heapResponse === "exit" ||
      heapResponse === "back_playground" ||
      heapResponse === "help"
    ) {
      return false;
    }
    return true;
  };

  while (true) {
    const { data } = await axios.default.get(
      "http://localhost:3001/names/binary_heap"
    );
    const { heapResponse, heapCommand } = await prompts([
      {
        type: "text",
        name: "heapResponse",
        message: `
      Welcome to the heap playground. Please enter the heap to modify/create or enter help for all the commands.
      Available heaps are : ${
        data.results === null ? "none created" : data.results
      }
      `,
      },
      {
        type: (prev) => (heapCommandNeeded(prev) ? "text" : null),
        name: "heapCommand",
        message: "Please enter the command for the selected heap",
      },
    ]);

    if (heapResponse === undefined) {
      return "exit";
    } else if (heapResponse === "exit") {
      return "exit";
    } else if (heapResponse === "back_playground") {
      return false;
    } else if (heapResponse === "help") {
      binaryHeapHelp();
    } else {
      // errorHandler("Invalid command entered", "heap");
    }
  }
}

module.exports = { binaryHeapCli };
