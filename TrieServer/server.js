const express = require("express");
const cors = require("cors");
const { Trie } = require("./trie");
const app = express();
let trie = new Trie();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.listen(3001, function () {
  console.log("Listening on Port 3001");
});

app.get("/", function (req, res) {
  res.send("Trie Server is working");
});

app.post("/add", function (req, res) {
  let wordToAdd = req.body.specifiedWord;

  trie.add(wordToAdd);
  res.json({ succeeded: true, message: `Word ${wordToAdd} Added to trie` });
});

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

app.get("/display", function (req, res) {
  let { words, structure } = trie.display();

  res.json({
    succeeded: true,
    message: `Here are the printed trie words:${words}\nHere is the trie structure:\n ${structure}`,
  });
});

app.get("/reset", function (req, res) {
  trie.reset();

  res.json({
    succeeded: true,
    message: `The trie has been cleared and resetted `,
  });
});

//sample curl requests
//curl -X POST -d "specifiedWord=word" -w "\n"  http://localhost:3001/autocomplete && curl -X GET http://localhost:3001/display
