//imports express for routes, cors for sharing resources and being api pingable, and the trie data structure
const express = require("express");
const cors = require("cors");
const { Trie } = require("./trie");
const app = express();
let trie = new Trie();

//uses cors, and allows express to parse bodies and json in api requests
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

//allows heroku to host server on its own port or 3001 on local
app.listen(process.env.PORT || 3001, function () {
  console.log("Listening on Port 3001");
});

//confirmation that server is working
app.get("/", function (req, res) {
  res.send("Trie Server is working");
});

//displays all the words in the trie and the trie structure in JSON
app.get("/display", function (req, res) {
  let { words, structure } = trie.display();

  res.json({
    succeeded: true,
    message: `Here are the printed trie words:${words}\nHere is the trie structure:\n ${structure}`,
  });
});

//resets the trie to have no word along with the json database file
app.get("/reset", function (req, res) {
  trie.reset();

  res.json({
    succeeded: true,
    message: `The trie has been cleared and resetted `,
  });
});

//adds a word to the trie
app.post("/add", function (req, res) {
  let wordToAdd = req.body.specifiedWord;

  trie.add(wordToAdd);
  res.json({ succeeded: true, message: `Word ${wordToAdd} Added to trie` });
});

//deletes a word from the trie if it is present
app.post("/delete", function (req, res) {
  let wordToDelete = req.body.specifiedWord;
  let isDeleted = trie.delete(wordToDelete);

  res.json({
    succeeded: true,
    message: isDeleted
      ? `Word ${wordToDelete} Deleted from trie`
      : `Word ${wordToDelete} was not found in the trie`,
  });
});

//checks if a word is in the trie and lets user know result
app.post("/search", function (req, res) {
  let wordToFind = req.body.specifiedWord;
  let wordFound = trie.search(wordToFind);

  res.json({
    succeeded: true,
    message: `Word ${wordToFind} is${
      wordFound === false ? " not" : ""
    } in trie`,
  });
});

//gets all the words in the trie starting with a prefix
app.post("/autocomplete", function (req, res) {
  let wordToAutocomplete = req.body.specifiedWord;
  let { found, words } = trie.autocomplete(wordToAutocomplete);
  let message = found
    ? `Prefix ${wordToAutocomplete} generated these words from the trie: ${words} `
    : `Prefix ${wordToAutocomplete} generated no words from the trie`;

  res.json({
    succeeded: true,
    message: message,
  });
});
