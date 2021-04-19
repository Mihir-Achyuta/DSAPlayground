const express = require("express");
const app = express();
const cors = require("cors");

app.use(cors());

app.listen(3001, function () {
  console.log("Listening on Port 3001");
});

app.post("/add", function (req, res) {
  console.log("Added");
  res.json({ succeeded: true, message: "Added to trie" });
});

app.post("/delete", function (req, res) {
  console.log("Deleted");
  res.json({ succeeded: true, message: "Deleted from trie" });
});

app.post("/search", function (req, res) {
  console.log("Searched");
  res.json({ succeeded: true, message: "Searched from trie" });
});

app.post("/autocomplete", function (req, res) {
  console.log("Autocompleted words");
  res.json({ succeeded: true, message: "Autocompleted words from trie" });
});

app.get("/display", function (req, res) {
  console.log("Displayed");
  res.json({ succeeded: true, message: "Displayed trie" });
});
