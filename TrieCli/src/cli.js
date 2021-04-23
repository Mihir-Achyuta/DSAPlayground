//npm modules imported (I am using arg to process arguments)
const arg = require("arg");
const axios = require("axios");

//the cli function which checks if the arguments entered are correct and executes them on the trie if they are
export function cli(originalArguments) {
  //converts arguments and gets all the boolean flag values from options to error handle
  //Error Checks : is there a wrong command?, are there multiple allowed commands in 1 command statement?, is there a command entered?
  let options = convertArguments(originalArguments);
  let flagValues = Object.values(options);

  //has the user entered a wrong command?
  if (options["error"]) {
    error("Error : Please enter an allowed command", true);
  }
  //has the user entered multiple commands?
  else if (
    flagValues.slice(0, flagValues.length - 1).filter((value) => value === true)
      .length > 1
  ) {
    error("Error : Please enter 1 allowed command at a time");
  }
  //has the user entered no commands?
  else if (
    flagValues.slice(0, flagValues.length - 1).every((value) => value === false)
  ) {
    helpCommands();
  }
  //if ONE correct command has been entered, we check if a word exists for the respective commands
  else {
    //gets the single command which the user entered along with a word if needed
    let command = Object.keys(options)
      .filter((value) => options[value] === true)
      .toString();
    let word = options["word"];

    //Error Checks: If the command is not display or reset, does it have a word specified?
    if (command === "display" || command == "reset" || word) {
      //TODO execute operation with word
      console.log("");
      console.log(`Executing operation ${command}...`);
      trieOperation(command, word);
    } else {
      console.log("");
      error(`Error : Please include a word with operation ${command}`);
    }
  }
}

//executes a specific operation on the trie and gets back the result
function trieOperation(command, word) {
  if (command === "display" || command === "reset") {
    axios
      .get(`https://triechallenge.herokuapp.com/${command}`)
      .then(function (results) {
        if (results["data"]["succeeded"]) {
          console.log(`Trie Operation ${command} Succeeded`);
          console.log("");
          console.log(results["data"]["message"]);
        }
      })
      .catch(function (err) {
        error("Error : Was not able to connect to the server");
      });
  } else {
    axios
      .post(`https://triechallenge.herokuapp.com/${command}`, {
        specifiedWord: word,
      })
      .then(function (results) {
        if (results["data"]["succeeded"]) {
          console.log(`Trie Operation ${command} Succeeded`);
          console.log("");
          console.log(results["data"]["message"]);
        }
      })
      .catch(function (err) {
        error("Error : Was not able to connect to the server");
      });
  }
}

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
        "--reset": Boolean,
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
      reset: args["--reset"] || false,
      word: args._[0],
    };
  } catch (err) {
    //if an unallowed command is entered then we return an error:true to the cli
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
  console.log("--reset                       removes all words from the trie and starts off with no nodes");
  console.log("");
}
