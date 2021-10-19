const prompts = require("prompts");
const axios = require("axios");

const { queueHelp } = require("../../help/helpCommands");
const { errorHandler } = require("../../../handlers/error/errorHandler");

async function queueCli() {
  while (true) {
    const { data } = await axios.default.get(
      "https://shielded-fortress-73492.herokuapp.com/names/queue"
    );
    const { queueResponse } = await prompts([
      {
        type: "text",
        name: "queueResponse",
        message: `
      Welcome to the queue playground. Please enter the queue to modify/create or enter help for all the commands.
      Available queues are : ${
        data.results === null || data.results.length === 0
          ? "none created"
          : data.results
      }
      `,
      },
    ]);

    //undefined response just exit
    if (queueResponse === undefined) {
      return "exit";
    }
    //if user enters exit then exit cli
    else if (queueResponse === "exit") {
      return "exit";
    }
    //if user wants to go back
    else if (queueResponse === "back_playground") {
      return false;
    }
    //if user wants to see the help commands
    else if (queueResponse === "help") {
      queueHelp();
    }
    //if user enters a queue name
    else {
      //queue in array so ask for command
      if (data.results.includes(queueResponse)) {
        const { queueCommand } = await prompts([
          {
            type: "text",
            name: "queueCommand",
            message: `Please enter a command for the selected queue ${queueResponse}`,
          },
        ]);

        //display queue
        if (queueCommand === "display") {
          const displayData = await axios.default.get(
            `https://shielded-fortress-73492.herokuapp.com/displayqueue/${queueResponse}`
          );
          console.log(displayData.data.message);
        }
        //delete queue
        else if (queueCommand === "delete") {
          const deleteData = await axios.default.delete(
            `https://shielded-fortress-73492.herokuapp.com/deletequeue/${queueResponse}`
          );
          console.log(deleteData.data.message);
        }
        //insert into queue
        else if (queueCommand === "enqueue") {
          const { queueValue } = await prompts([
            {
              type: "number",
              name: "queueValue",
              message: `Please enter the value for queue command ${queueCommand}`,
            },
          ]);
          const enqueueData = await axios.default.post(
            `https://shielded-fortress-73492.herokuapp.com/enqueue/${queueResponse}/${queueValue}`
          );
          console.log(enqueueData.data.message);
        } else if (queueCommand === "dequeue") {
          const dequeueData = await axios.default.post(
            `https://shielded-fortress-73492.herokuapp.com/dequeue/${queueResponse}`
          );
          console.log(dequeueData.data.message);
        }
        //error handler
        else {
          errorHandler("Invalid command entered", "queue");
        }
      }
      //queue not in array so add it
      else {
        const createData = await axios.default.post(
          `https://shielded-fortress-73492.herokuapp.com/createqueue/${queueResponse}`
        );
        console.log(createData.data.message);
      }
    }
  }
}

module.exports = { queueCli };
