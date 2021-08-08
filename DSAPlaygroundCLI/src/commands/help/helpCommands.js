//help docs to help users navigate the cli  (ignored by prettier formatter for formatting reasons)
// prettier-ignore
function helpCommands() {
  console.log("");
  console.log("Commands are done by package_name command for all commands except display and reset");
  console.log("All Possible Commands: ");
  console.log("sign_in                    signs in the user if not already signed in");
  console.log("sign_up                    creates a new user account the user if not already signed in");
  console.log("sign_out                   logs out the user if not already logged out");
  console.log("enter_playground           enter the dsaPlayground to start experimenting with data structures and algorithms")
  console.log("");
}

module.exports = { helpCommands };
