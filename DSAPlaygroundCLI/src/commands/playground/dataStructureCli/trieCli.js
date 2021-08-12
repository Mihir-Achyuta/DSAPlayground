const prompts = require("prompts");
const axios = require("axios");

const { trieHelp } = require("../../help/helpCommands");
const { errorHandler } = require("../../../handlers/error/errorHandler");

async function trieCli() {
  while (true) {
    const { data } = await axios.default.get(
      "http://localhost:3001/names/trie"
    );
    const { trieResponse } = await prompts([
      {
        type: "text",
        name: "trieResponse",
        message: `
      Welcome to the trie playground. Please enter the trie to modify/create or enter help for all the commands.
      Available tries are : ${
        data.results === null || data.results.length === 0
          ? "none created"
          : data.results
      }
      `,
      },
    ]);

    //undefined response just exit
    if (trieResponse === undefined) {
      return "exit";
    }
    //if user enters exit then exit cli
    else if (trieResponse === "exit") {
      return "exit";
    }
    //if user wants to go back
    else if (trieResponse === "back_playground") {
      return false;
    }
    //if user wants to see the help commands
    else if (trieResponse === "help") {
      trieHelp();
    }
    //if user enters a trie name
    else {
      //trie in array so ask for command
      if (data.results.includes(trieResponse)) {
        const { trieCommand } = await prompts([
          {
            type: "text",
            name: "trieCommand",
            message: `Please enter a command for the selected trie ${trieResponse}`,
          },
        ]);

        //display trie
        if (trieCommand === "display") {
          const displayData = await axios.default.get(
            `http://localhost:3001/displaytrie/${trieResponse}`
          );
          console.log(displayData.data.message);
        }
        //reset trie
        else if (trieCommand === "reset") {
          const resetData = await axios.default.get(
            `http://localhost:3001/resettrie/${trieResponse}`
          );
          console.log(resetData.data.message);
        }
        //delete trie
        else if (trieCommand === "delete") {
          const deleteData = await axios.default.delete(
            `http://localhost:3001/deletetrie/${trieResponse}`
          );
          console.log(deleteData.data.message);
        }
        //insert, delete, search, autocomplete word into trie
        else if (
          trieCommand === "add" ||
          trieCommand === "delete_word" ||
          trieCommand === "search" ||
          trieCommand === "autocomplete"
        ) {
          const { trieValue } = await prompts([
            {
              type: "text",
              name: "trieValue",
              message: `Please enter the value for trie command ${trieCommand}`,
            },
          ]);
          const trieData = await axios.default.post(
            `http://localhost:3001/${
              trieCommand === "delete_word" ? "delete" : trieCommand
            }trie/${trieResponse}/${trieValue}`
          );
          console.log(trieData.data.message);
        }
        //error handler
        else {
          errorHandler("Invalid command entered", "trie");
        }
      }
      //trie not in array so add it
      else {
        const createData = await axios.default.post(
          `http://localhost:3001/createtrie/${trieResponse}`
        );
        console.log(createData.data.message);
      }
    }
  }
}

module.exports = { trieCli };
