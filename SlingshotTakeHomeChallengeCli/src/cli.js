const arg = require("arg");

export function cli(originalArguments) {
  let options = convertArguements(originalArguments);
  if (options["error"]) {
    error("Error : Please enter an allowed command", true);
  } else {
    console.log("Allowed Prompt");
  }
}

function convertArguements(originalArguments) {
  try {
    const args = arg(
      {
        "--add": Boolean,
        "--delete": Boolean,
        "--search": Boolean,
        "--autocomplete": Boolean,
        "--display": Boolean,
      },
      //the first 2 raw arguments are file paths we dont need so we take them off
      { argv: originalArguments.slice(2) }
    );
    return {
      add: args["--add"] || false,
      delete: args["--delete"] || false,
      search: args["search"] || false,
      autocomplete: args["autocomplete"] || false,
      display: args["display"] || false,
      word: args._[0],
    };
  } catch (err) {
    return { error: true };
  }
}

//error function in case of any bad user input
function error(message, includeHelpCommand = false) {
  console.error(message);
  if (includeHelpCommand) {
    console.log("");
    helpCommands();
  }
}

//help function to help users navigate the cli  (ignored by prettier formatter for formatting reasons)
// prettier-ignore
function helpCommands() {
  console.log("All Possible Commands For The Trie: ")
  console.log("--add                    adds a word to the trie");
  console.log("--delete                 deletes a word from the trie");
  console.log("--search                 searches a trie for a word");
  console.log("--autocomplete           gives a list of prefix included words in the trie given a prefix");
  console.log("--display                prints the trie out");
  console.log("");
}
