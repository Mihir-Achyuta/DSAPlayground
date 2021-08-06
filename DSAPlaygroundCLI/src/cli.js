const prompts = require("prompts");

const { helpCommands } = require("./commands/help/helpCommands");
const {
  signIn,
  signUp,
  signOut,
} = require("./commands/authCommands/authCommands");
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
    signIn();
  }
  //sign up user if not already
  else if (welcomeValue === "sign_up") {
    signUp();
  }
  //sign out user if not already
  else if (welcomeValue === "sign_out") {
    signOut();
  }
  //invalid command error if no detected command
  else {
    error(
      "Invalid command entered. Please refer to the help guide for all the commands",
      true
    );
  }
})();
