const arg = require("arg");

export function cli(originalArguments) {
  let options = convertArguements(originalArguments);
  console.log(options);
}

function convertArguements(originalArguments) {
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
}

//help function to help users navigate the cli  (ignored by prettier formatter for formatting reasons)
// prettier-ignore
function helpCommands() {
  console.log("--add                    adds a word to the trie");
  console.log("--delete                 deletes a word from the trie");
  console.log("--search                 searches a trie for a word");
  console.log("--autocomplete           gives a list of words in the trie given a prefix");
  console.log("--display                prints the trie out");
  console.log("");
}
