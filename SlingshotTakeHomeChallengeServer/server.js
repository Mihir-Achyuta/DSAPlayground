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
  res.json({ succeeded: true, message: "Deleted from trie" });
});

app.post("/search", function (req, res) {
  res.json({ succeeded: true, message: "Searched from trie" });
});

app.post("/autocomplete", function (req, res) {
  res.json({ succeeded: true, message: "Autocompleted words from trie" });
});

app.get("/display", function (req, res) {
  res.json({ succeeded: true, message: "Displayed trie" });
});
