const prompts = require("prompts");

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

      case "help":
        welcomeHelp();
        break;

      case "sign_in":
        signIn();
        break;

      case "sign_up":
        signUp();
        break;

      case "sign_out":
        signOut();
        break;

      case "playground":
        playgroundCli();
        break;

      default:
        errorHandler(
          "Invalid command entered. Please refer to the help guide for all the commands",
          true
        );
    }
  }
})();
