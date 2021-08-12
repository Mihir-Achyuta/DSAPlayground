const prompts = require("prompts");
const axios = require("axios");

const { stackHelp } = require("../../help/helpCommands");
const { errorHandler } = require("../../../handlers/error/errorHandler");

async function stackCli() {
  while (true) {
    const { data } = await axios.default.get(
      "https://z575cc22e-za2982c25-gtw.qovery.io/names/stack"
    );
    const { stackResponse } = await prompts([
      {
        type: "text",
        name: "stackResponse",
        message: `
      Welcome to the stack playground. Please enter the stack to modify/create or enter help for all the commands.
      Available stacks are : ${
        data.results === null || data.results.length === 0
          ? "none created"
          : data.results
      }
      `,
      },
    ]);

    //undefined response just exit
    if (stackResponse === undefined) {
      return "exit";
    }
    //if user enters exit then exit cli
    else if (stackResponse === "exit") {
      return "exit";
    }
    //if user wants to go back
    else if (stackResponse === "back_playground") {
      return false;
    }
    //if user wants to see the help commands
    else if (stackResponse === "help") {
      stackHelp();
    }
    //if user enters a stack name
    else {
      //stack in array so ask for command
      if (data.results.includes(stackResponse)) {
        const { stackCommand } = await prompts([
          {
            type: "text",
            name: "stackCommand",
            message: `Please enter a command for the selected stack ${stackResponse}`,
          },
        ]);

        //display stack
        if (stackCommand === "display") {
          const displayData = await axios.default.get(
            `https://z575cc22e-za2982c25-gtw.qovery.io/displaystack/${stackResponse}`
          );
          console.log(displayData.data.message);
        }
        //delete stack
        else if (stackCommand === "delete") {
          const deleteData = await axios.default.delete(
            `https://z575cc22e-za2982c25-gtw.qovery.io/deletestack/${stackResponse}`
          );
          console.log(deleteData.data.message);
        }
        //insert into stack
        else if (stackCommand === "push") {
          const { stackValue } = await prompts([
            {
              type: "number",
              name: "stackValue",
              message: `Please enter the value for stack command ${stackCommand}`,
            },
          ]);
          const pushData = await axios.default.post(
            `https://z575cc22e-za2982c25-gtw.qovery.io/pushstack/${stackResponse}/${stackValue}`
          );
          console.log(pushData.data.message);
        } else if (stackCommand === "pop") {
          const popData = await axios.default.post(
            `https://z575cc22e-za2982c25-gtw.qovery.io/popstack/${stackResponse}`
          );
          console.log(popData.data.message);
        }
        //error handler
        else {
          errorHandler("Invalid command entered", "stack");
        }
      }
      //stack not in array so add it
      else {
        const createData = await axios.default.post(
          `https://z575cc22e-za2982c25-gtw.qovery.io/createstack/${stackResponse}`
        );
        console.log(createData.data.message);
      }
    }
  }
}

module.exports = { stackCli };
