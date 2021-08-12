const prompts = require("prompts");
const axios = require("axios");

const { binarySearchTreeHelp } = require("../../help/helpCommands");
const { errorHandler } = require("../../../handlers/error/errorHandler");

async function binarySearchTreeCli() {
  while (true) {
    const { data } = await axios.default.get(
      "http://localhost:3001/names/binary_search_tree"
    );
    const { bstResponse } = await prompts([
      {
        type: "text",
        name: "bstResponse",
        message: `
      Welcome to the binary search tree playground. Please enter the binary search tree to modify/create or enter help for all the commands.
      Available binary search trees are : ${
        data.results === null ? "none created" : data.results
      }
      `,
      },
    ]);

    //undefined response just exit
    if (bstResponse === undefined) {
      return "exit";
    }
    //if user enters exit then exit cli
    else if (bstResponse === "exit") {
      return "exit";
    }
    //if user wants to go back
    else if (bstResponse === "back_playground") {
      return false;
    }
    //if user wants to see the help commands
    else if (bstResponse === "help") {
      binarySearchTreeHelp();
    }
    //if user enters a bst name
    else {
      //bst in array so ask for command
      if (data.results.includes(bstResponse)) {
        const { bstCommand } = await prompts([
          {
            type: "text",
            name: "bstCommand",
            message: `Please enter a command for the selected bst ${bstResponse}`,
          },
        ]);

        //display bst
        if (bstCommand === "display") {
          const displayData = await axios.default.get(
            `http://localhost:3001/displaybst/${bstResponse}`
          );
          console.log(displayData.data.message);
        }
        //delete bst
        else if (bstCommand === "delete") {
          const deleteData = await axios.default.delete(
            `http://localhost:3001/deletebst/${bstResponse}`
          );
          console.log(deleteData.data.message);
        }
        //extract from bst
        else if (bstCommand === "search") {
          const { bstValue } = await prompts([
            {
              type: "number",
              name: "bstValue",
              message: `Please enter the value for bst command ${bstCommand}`,
            },
          ]);
          const searchData = await axios.default.get(
            `http://localhost:3001/searchbst/${bstResponse}/${bstValue}`
          );
          console.log(searchData.data.message);
        }
        //insert into bst
        else if (bstCommand === "insert") {
          const { bstValue } = await prompts([
            {
              type: "number",
              name: "bstValue",
              message: `Please enter the value for bst command ${bstCommand}`,
            },
          ]);
          const insertData = await axios.default.post(
            `http://localhost:3001/insertbst/${bstResponse}/${bstValue}`
          );
          console.log(insertData.data.message);
        }
        //error handler
        else {
          errorHandler("Invalid command entered", "bst");
        }
      }
      //bst not in array so add it
      else {
        const createData = await axios.default.post(
          `http://localhost:3001/createbst/${bstResponse}`
        );
        console.log(createData.data.message);
      }
    }
  }
}

module.exports = { binarySearchTreeCli };
