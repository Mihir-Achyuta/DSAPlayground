const prompts = require("prompts");
const axios = require("axios");

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

//error handler in case of any bad user input
function error(message, includeHelpCommand = false) {
  console.error(`Error: ${message}`);
  if (includeHelpCommand) {
    console.log("");
    helpCommands();
  }
}

//help docs to help users navigate the cli  (ignored by prettier formatter for formatting reasons)
// prettier-ignore
function helpCommands() {
  console.log("");
  console.log("Commands are done by package_name command for all commands except display and reset");
  console.log("All Possible Commands: ");
    
  console.log("package_name sign_in                    signs in the user if not already signed in");
  console.log("package_name sign_up                    creates a new user account the user if not already signed in");
  console.log("package_name sign_out                   logs out the user if not already logged out");
  console.log("");
}
