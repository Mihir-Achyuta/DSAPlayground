const prompts = require("prompts");
const axios = require("axios");

const { binaryHeapHelp } = require("../../help/helpCommands");
const { errorHandler } = require("../../../handlers/error/errorHandler");

async function binaryHeapCli() {
  while (true) {
    const { data } = await axios.default.get(
      "https://shielded-fortress-73492.herokuapp.com/names/binary_heap"
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
            message: `Please enter a command for the selected heap ${heapResponse}`,
          },
        ]);

        //display heap
        if (heapCommand === "display") {
          const displayData = await axios.default.get(
            `https://shielded-fortress-73492.herokuapp.com/displayheap/${heapResponse}`
          );
          console.log(displayData.data.message);
        }
        //delete heap
        else if (heapCommand === "delete") {
          const deleteData = await axios.default.delete(
            `https://shielded-fortress-73492.herokuapp.com/deleteheap/${heapResponse}`
          );
          console.log(deleteData.data.message);
        }
        //extract from heap
        else if (heapCommand === "extract") {
          const extractData = await axios.default.post(
            `https://shielded-fortress-73492.herokuapp.com/extractheap/${heapResponse}`
          );
          console.log(extractData.data.message);
        }
        //insert into heap
        else if (heapCommand === "insert") {
          const { heapValue } = await prompts([
            {
              type: "number",
              name: "heapValue",
              message: `Please enter the value for heap command ${heapCommand}`,
            },
          ]);
          const insertData = await axios.default.post(
            `https://shielded-fortress-73492.herokuapp.com/insertheap/${heapResponse}/${heapValue}`
          );
          console.log(insertData.data.message);
        }
        //error handler
        else {
          errorHandler("Invalid command entered", "heap");
        }
      }
      //heap not in array so add it
      else {
        const createData = await axios.default.post(
          `https://shielded-fortress-73492.herokuapp.com/createheap/${heapResponse}`
        );
        console.log(createData.data.message);
      }
    }
  }
}

module.exports = { binaryHeapCli };
