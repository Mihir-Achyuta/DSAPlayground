const prompts = require("prompts");
const axios = require("axios");

const { welcomeHelp } = require("./commands/help/helpCommands");
const { signIn, signUp, signOut } = require("./commands/auth/authCommands");
const { playgroundCli } = require("./commands/playground/playgroundCommands");
const { errorHandler } = require("./handlers/error/errorHandler");

export default (async function newCli() {
  let shouldExit = false;

  while (!shouldExit) {
    const { welcomeValue } = await prompts({
      type: "text",
      name: "welcomeValue",
      message:
        "Welcome to the DSA Playground. What would you like to do today? Enter help for all the commands",
    });

    switch (welcomeValue) {
      case undefined:
        shouldExit = true;
        break;

      case "exit":
        shouldExit = true;
        break;

      case "playground":
        const { data } = await axios.default.get(
          "https://shielded-fortress-73492.herokuapp.com/currentuser"
        );

        if (data.results === null) {
          console.log("Please sign in or sign up to access playground");
        } else {
          shouldExit = await playgroundCli();
        }
        break;

      case "help":
        welcomeHelp();
        break;

      case "sign_in":
        shouldExit = await signIn();
        break;

      case "sign_up":
        shouldExit = await signUp();
        break;

      case "sign_out":
        shouldExit = await signOut();
        break;

      default:
        errorHandler(
          "Invalid command entered. Please refer to the help guide for all the commands",
          "welcome"
        );
    }
  }
})();
