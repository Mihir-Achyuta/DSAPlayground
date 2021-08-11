// prettier-ignore
function trieHelp() {
    console.log("");
    console.log("Commands are done by data_structure_name data_structure_command (and data_structure_value if needed) for all commands");
    console.log("All Possible Stack Commands: ");
    console.log("exit                                    exits the DSACli");
    console.log("back_playground                         navigates back to the playground cli");
    console.log("display                                 displays the trie's words");
    console.log("reset                                   resets the trie's contents");
    console.log("create                                  creates a new trie");
    console.log("add                                     adds a new word to the trie");
    console.log("delete_word                             deletes a word from the trie");
    console.log("search                                  searches a word in the trie");
    console.log("autocomplete                            autocompletes a word in the trie");
    console.log("delete                                  deletes the trie");
    console.log("");
}

module.exports = { trieHelp };
