const arg = require("arg");

export function cli(originalArguements) {
  let options = convertArguements(originalArguements);
  console.log(options);
}

function convertArguements(originalArguements) {
  const args = arg(
    {
      "--add": Boolean,
      "--delete": Boolean,
      "--autocomplete": Boolean,
      "--search": Boolean,
      "--display": Boolean,
    },
    { argv: originalArguements.slice(2) }
  );
  return {
    add: args["--add"] || false,
    delete: args["--delete"] || false,
    autocomplete: args["autocomplete"] || false,
    search: args["search"] || false,
    display: args["display"] || false,
  };
}
