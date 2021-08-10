const { Trie } = require("../models/trie");
let trie = new Trie();

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

//creates the trie
function createTrie(req, res) {}

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

//deletes trie from data
function deleteTrie(req, res) {
  getUserData()
    .get()
    .then((doc) => {
      const { currentData } = doc.data();
      const trieFound = currentData["trie"].find(
        (trie) => trie["name"] === req.params.name
      );

      if (trie) {
        currentData["trie"] = currentData["trie"].filter(
          (trie) => trie["name"] !== req.params.name
        );
        getUserData().set({ currentData });

        res.json({
          message: `Deleted trie with name ${req.params.name}`,
          error: false,
          code: 200,
          results: trieFound,
        });
      } else {
        res.json({
          message: `Trie with name ${req.params.name} doesn't exist`,
          error: false,
          code: 200,
          results: trie,
        });
      }
    })
    .catch((error) => console.log(error));
}

module.exports = {
  displayTrie,
  resetTrie,
  createTrie,
  addToTrie,
  deleteFromTrie,
  searchInTrie,
  autoCompleteTrie,
  deleteTrie,
};
