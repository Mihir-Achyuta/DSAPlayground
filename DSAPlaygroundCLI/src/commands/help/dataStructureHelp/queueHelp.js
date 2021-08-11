// prettier-ignore
function queueHelp() {
    console.log("");
    console.log("Commands are done by data_structure_name data_structure_command (and data_structure_value if needed) for all commands");
    console.log("All Possible Queue Commands: ");
    console.log("exit                                    exits the DSACli");
    console.log("back_playground                         navigates back to the playground cli");
    console.log("display                                 displays the queue");
    console.log("create                                  creates a new queue");
    console.log("enqueue                                 inserts a value into the queue");
    console.log("dequeue                                 extracts the earliest inserted value into the queue");
    console.log("delete                                  deletes the queue");
    console.log("");
}

module.exports = { queueHelp };
