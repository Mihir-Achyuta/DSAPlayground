const { Trie } = require("../trie");
let trie = new Trie();

//confirmation that server is working
function serverWorking(req, res) {
  res.send("Trie Server is working");
}

//displays all the words in the trie and the trie structure in JSON
function displayTrie(req, res) {
  let { words, structure } = trie.display();

  res.json({
    succeeded: true,
    message: `Here are the printed trie words:${words}\nHere is the trie structure:\n ${structure}`,
  });
}

//resets the trie to have no word along with the json database file
function resetTrie(req, res) {
  trie.reset();

  res.json({
    succeeded: true,
    message: `The trie has been cleared and resetted `,
  });
}

//adds a word to the trie
function addToTrie(req, res) {
  let wordToAdd = req.body.specifiedWord;
  console.log(req.body);

  trie.add(wordToAdd);
  res.json({ succeeded: true, message: `Word ${wordToAdd} Added to trie` });
}

//deletes a word from the trie if it is present
function deleteFromTrie(req, res) {
  let wordToDelete = req.body.specifiedWord;
  let isDeleted = trie.delete(wordToDelete);

  res.json({
    succeeded: true,
    message: isDeleted
      ? `Word ${wordToDelete} Deleted from trie`
      : `Word ${wordToDelete} was not found in the trie`,
  });
}

//checks if a word is in the trie and lets user know result
function searchInTrie(req, res) {
  let wordToFind = req.body.specifiedWord;
  let wordFound = trie.search(wordToFind);

  res.json({
    succeeded: true,
    message: `Word ${wordToFind} is${
      wordFound === false ? " not" : ""
    } in trie`,
  });
}

//gets all the words in the trie starting with a prefix
function autoCompleteTrie(req, res) {
  let wordToAutocomplete = req.body.specifiedWord;
  let { found, words } = trie.autocomplete(wordToAutocomplete);
  let message = found
    ? `Prefix ${wordToAutocomplete} generated these words from the trie: ${words} `
    : `Prefix ${wordToAutocomplete} generated no words from the trie`;

  res.json({
    succeeded: true,
    message: message,
  });
}

module.exports = {
  serverWorking,
  displayTrie,
  resetTrie,
  addToTrie,
  deleteFromTrie,
  searchInTrie,
  autoCompleteTrie,
};
