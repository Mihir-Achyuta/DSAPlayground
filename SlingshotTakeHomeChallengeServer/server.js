const express = require("express");
const cors = require("cors");
const app = express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.listen(3001, function () {
  console.log("Listening on Port 3001");
});

app.post("/add", function (req, res) {
  let wordToAdd = req.body.specifiedWord;
  res.json({ succeeded: true, message: `Word ${wordToAdd} Added to trie` });
});

app.post("/delete", function (req, res) {
  let wordToDelete = req.body.specifiedWord;
  res.json({
    succeeded: true,
    message: `Word ${wordToDelete} Deleted from trie`,
  });
});

app.post("/search", function (req, res) {
  let wordToFind = req.body.specifiedWord;
  let wordFound = true;
  res.json({
    succeeded: true,
    message: `Word ${wordToFind} is${
      wordFound === false ? " not" : ""
    } in trie`,
  });
});

app.post("/autocomplete", function (req, res) {
  let wordToAutocomplete = req.body.specifiedWord;
  let autocompletedWords = "";
  res.json({
    succeeded: true,
    message: `Prefix ${wordToAutocomplete} generated these words from the trie ${autocompletedWords}: `,
  });
});

app.get("/display", function (req, res) {
  let printedTrie = `
  c a t
      b
    o r n
    ut
  `;

  res.json({
    succeeded: true,
    message: `
  Here is the printed trie
  ${printedTrie}
  `,
  });
});

//sample curl requests
//curl -X POST -d "specifiedWord=word" -w "\n"  http://localhost:3001/add && curl -X GET http://localhost:3001/display
