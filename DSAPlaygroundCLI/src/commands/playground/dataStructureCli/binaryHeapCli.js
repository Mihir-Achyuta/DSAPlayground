const prompts = require("prompts");
const axios = require("axios");

const { binaryHeapHelp } = require("../../help/helpCommands");
const { errorHandler } = require("../../../handlers/error/errorHandler");

async function binaryHeapCli() {
  while (true) {
    const { data } = await axios.default.get(
      "http://localhost:3001/names/binary_heap"
    );
    const { heapResponse } = await prompts([
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
    ]);

    //undefined response just exit
    if (heapResponse === undefined) {
      return "exit";
    }
    //if user enters exit then exit cli
    else if (heapResponse === "exit") {
      return "exit";
    }
    //if user wants to go back
    else if (heapResponse === "back_playground") {
      return false;
    }
    //if user wants to see the help commands
    else if (heapResponse === "help") {
      binaryHeapHelp();
    }
    //if user enters a heap name
    else {
      //heap in array so ask for command
      if (data.results.includes(heapResponse)) {
        const { heapCommand } = await prompts([
          {
            type: "text",
            name: "heapCommand",
            message: "Please enter a command for the selected heap",
          },
        ]);
        console.log(heapCommand);
      }
      //heap not in array so add it
      else {
        const { data } = await axios.default.post(
          `http://localhost:3001/createheap/${heapResponse}`
        );
        console.log(data.message);
      }
    }
  }
}

module.exports = { binaryHeapCli };
