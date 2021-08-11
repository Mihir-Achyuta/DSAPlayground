const { Trie } = require("../models/trie");
const { getUserData } = require("./userDataHandlers");

//displays all the words in the trie and the trie structure in JSON
function displayTrie(req, res) {
  getUserData()
    .get()
    .then((doc) => {
      const { currentData } = doc.data();
      const trieFound = currentData["trie"].find(
        (trie) => trie["name"] === req.params.name
      );

      if (trieFound) {
        const trie = new Trie(JSON.parse(trieFound["data"]));
        const { words } = trie.display();

        res.json({
          message: `Here are the printed trie words:${words}`,
          error: false,
          code: 200,
          results: trieFound,
        });
      } else {
        res.json({
          message: `Trie with name ${req.params.name} doesn't exist`,
          error: false,
          code: 200,
          results: trieFound,
        });
      }
    })
    .catch((error) => console.log(error));
}

//resets the trie to have no word along with the json database file
function resetTrie(req, res) {
  getUserData()
    .get()
    .then((doc) => {
      const { currentData } = doc.data();
      const trieFound = currentData["trie"].find(
        (trie) => trie["name"] === req.params.name
      );

      if (trieFound) {
        const trie = new Trie(JSON.parse(trieFound["data"]));

        trieFound["data"] = JSON.stringify(trie.reset());
        getUserData().set({ currentData });
        res.json({
          message: `The trie with name ${req.params.name} has been cleared and resetted`,
          error: false,
          code: 200,
          results: trieFound,
        });
      } else {
        res.json({
          message: `Trie with name ${req.params.name} doesn't exist`,
          error: false,
          code: 200,
          results: trieFound,
        });
      }
    })
    .catch((error) => console.log(error));
}

//creates the trie
function createTrie(req, res) {
  getUserData()
    .get()
    .then((doc) => {
      const { currentData } = doc.data();
      const isDuplicate = currentData["trie"].find(
        (trie) => trie["name"] === req.params.name
      );

      if (isDuplicate) {
        res.json({
          message: `Trie with name ${req.params.name} already exists`,
          error: false,
          code: 200,
          results: isDuplicate,
        });
      } else {
        currentData["trie"].push({
          name: req.params.name,
          data: JSON.stringify({
            letter: null,
            children: {},
            wordEnd: false,
          }),
        });
        getUserData().set({ currentData });
        res.json({
          message: `Trie with name ${req.params.name} created`,
          error: false,
          code: 200,
          results: {
            name: req.params.name,
            data: JSON.stringify({
              letter: null,
              children: {},
              wordEnd: false,
            }),
          },
        });
      }
    })
    .catch((error) => console.log(error));
}

//adds a word to the trie
function addToTrie(req, res) {
  getUserData()
    .get()
    .then((doc) => {
      const { currentData } = doc.data();
      const trieFound = currentData["trie"].find(
        (trie) => trie["name"] === req.params.name
      );

      if (trieFound) {
        const trie = new Trie(JSON.parse(trieFound["data"]));

        trieFound["data"] = JSON.stringify(trie.add(req.params.word));
        getUserData().set({ currentData });
        res.json({
          message: `Word ${req.params.word} added to trie with name ${req.params.name}`,
          error: false,
          code: 200,
          results: trieFound,
        });
      } else {
        res.json({
          message: `Trie with name ${req.params.name} doesn't exist`,
          error: false,
          code: 200,
          results: trieFound,
        });
      }
    })
    .catch((error) => console.log(error));
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
  getUserData()
    .get()
    .then((doc) => {
      const { currentData } = doc.data();
      const trieFound = currentData["trie"].find(
        (trie) => trie["name"] === req.params.name
      );

      if (trieFound) {
        const trie = new Trie(JSON.parse(trieFound["data"]));
        const wordFound = trie.search(req.params.word);

        res.json({
          message: `Word ${req.params.word} is${
            wordFound === false ? " not" : ""
          } in trie`,
          error: false,
          code: 200,
          results: trieFound,
        });
      } else {
        res.json({
          message: `Trie with name ${req.params.name} doesn't exist`,
          error: false,
          code: 200,
          results: trieFound,
        });
      }
    })
    .catch((error) => console.log(error));
}

//gets all the words in the trie starting with a prefix
function autoCompleteTrie(req, res) {
  getUserData()
    .get()
    .then((doc) => {
      const { currentData } = doc.data();
      const trieFound = currentData["trie"].find(
        (trie) => trie["name"] === req.params.name
      );

      if (trieFound) {
        const trie = new Trie(JSON.parse(trieFound["data"]));
        const { found, words } = trie.autocomplete(req.params.word);

        res.json({
          message: found
            ? `Prefix ${req.params.word} generated these words from the trie: ${words} `
            : `Prefix ${req.params.word} generated no words from the trie`,
          error: false,
          code: 200,
          results: trieFound,
        });
      } else {
        res.json({
          message: `Trie with name ${req.params.name} doesn't exist`,
          error: false,
          code: 200,
          results: trieFound,
        });
      }
    })
    .catch((error) => console.log(error));
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

      if (trieFound) {
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
