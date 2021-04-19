//npm modules imported (I am using arg to process arguments)
const arg = require("arg");
const axios = require("axios");

//the cli function which checks if the arguments entered are correct and executes them on the trie if they are
export async function cli(originalArguments) {
  //converts arguments and gets all the boolean flag values from options to error handle
  //Error Checks : is there a wrong command?, are there multiple allowed commands in 1 command statement?, is there a command entered?
  let options = convertArguments(originalArguments);
  let flagValues = Object.values(options);
  if (options["error"]) {
    error("Error : Please enter an allowed command", true);
  } else if (
    flagValues.slice(0, flagValues.length - 1).filter((value) => value === true)
      .length > 1
  ) {
    error("Error : Please enter 1 allowed command at a time");
  } else if (
    flagValues.slice(0, flagValues.length - 1).every((value) => value === false)
  ) {
    helpCommands();
  } else {
    let command = Object.keys(options)
      .filter((value) => options[value] === true)
      .toString();
    let word = options["word"];
    if (command === "display") {
      //TODO display the trie
      console.log(`Executing operation ${command}...`);
    } else if (word) {
      //TODO execute operation with word
      console.log(`Executing operation ${command}...`);
    } else {
      error(`Please include a word with operation ${command}`);
    }
  }
}

//executes a specific operation on the trie and gets back the result
async function trieOperation(command, word) {}

//gets raw string arguments and turns them into an object with the form: command:toBeExecuted(true or false)?
function convertArguments(originalArguments) {
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
      search: args["--search"] || false,
      autocomplete: args["--autocomplete"] || false,
      display: args["--display"] || false,
      word: args._[0],
    };
  } catch (err) {
    return { error: true };
  }
}

//error handler in case of any bad user input
function error(message, includeHelpCommand = false) {
  console.error(message);
  if (includeHelpCommand) {
    console.log("");
    helpCommands();
  }
}

//help docs to help users navigate the cli  (ignored by prettier formatter for formatting reasons)
// prettier-ignore
function helpCommands() {
  console.log("");
  console.log("Commands are done by --COMMAND WORD for all commands except display");
  console.log("All Possible Commands For The Trie: ");
  console.log("--add WORD                    adds a word to the trie");
  console.log("--delete WORD                 deletes a word from the trie");
  console.log("--search WORD                 searches a trie for a word");
  console.log("--autocomplete WORD           gives a list of prefix included words in the trie given a prefix");
  console.log("--display                     prints the trie out");
  console.log("");
}
