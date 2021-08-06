const prompts = require("prompts");
const axios = require("axios");

const { helpCommands } = require("./commands/help/helpCommands");
const { error } = require("./handlers/error/errorHandler");

export default (async function newCli() {
  const { welcomeValue } = await prompts({
    type: "text",
    name: "welcomeValue",
    message:
      "Welcome to the DSA Playground. What would you like to do today? Enter help for all the commands",
  });

  if (welcomeValue === "help") {
    helpCommands();
  }
  //sign in user if not already
  else if (welcomeValue === "sign_in") {
    try {
      const { data } = await axios.get("http://localhost:3001/currentuser");

      if (data["results"] === null) {
        //allow user to sign in
      } else {
        error(data["message"]);
      }
    } catch (error) {
      error(error);
    }
  }
  //sign up user if not already
  else if (welcomeValue === "sign_up") {
    try {
      const { data } = await axios.get("http://localhost:3001/currentuser");

      if (data["results"] === null) {
        //allow user to sign up
      } else {
        error(data["message"]);
      }
    } catch (error) {
      error(error);
    }
  }
  //sign out user if not already
  else if (welcomeValue === "sign_out") {
    try {
      const { data } = await axios.get("http://localhost:3001/currentuser");

      if (data["results"] !== null) {
        //make user sign up
      } else {
        error(data["message"]);
      }
    } catch (error) {
      error(error);
    }
  }
  //invalid command error if no detected command
  else {
    error(
      "Invalid command entered. Please refer to the help guide for all the commands",
      true
    );
  }
})();
