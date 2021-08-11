// prettier-ignore
function stackHelp() {
    console.log("");
    console.log("Commands are done by data_structure_name data_structure_command (and data_structure_value if needed) for all commands");
    console.log("All Possible Stack Commands: ");
    console.log("exit                                    exits the DSACli");
    console.log("back_playground                         navigates back to the playground cli");
    console.log("display                                 displays the stack");
    console.log("create                                  creates a new stack");
    console.log("push                                    inserts a value into the stack");
    console.log("pop                                     extracts the most recently inserted value into the stack");
    console.log("delete                                  deletes the stack");
    console.log("");
}

module.exports = { stackHelp };
