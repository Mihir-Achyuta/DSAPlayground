const prompts = require("prompts");

export default (async function newCli() {
  const welcomeResponse = await prompts({
    type: "text",
    name: "welcomeValue",
    message:
      "Welcome to the DSA Playground. What would you like to do today? Enter help for all the commands",
  });

  console.log(welcomeResponse);
})();

function helpCommands() {
  console.log("");
  console.log(
    "Commands are done by package_name command for all commands except display and reset"
  );
  console.log("All Possible Commands: ");
  console.log("");
}
