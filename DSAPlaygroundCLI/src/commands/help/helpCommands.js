//help docs to help users navigate the cli  (ignored by prettier formatter for formatting reasons)
// prettier-ignore
function helpCommands() {
  console.log("");
  console.log("Commands are done by package_name command for all commands except display and reset");
  console.log("All Possible Commands: ");
    
  console.log("package_name sign_in                    signs in the user if not already signed in");
  console.log("package_name sign_up                    creates a new user account the user if not already signed in");
  console.log("package_name sign_out                   logs out the user if not already logged out");
  console.log("");
}

module.exports = { helpCommands };