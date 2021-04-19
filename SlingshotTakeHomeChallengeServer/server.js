const express = require("express");
const app = express();

app.listen(3001, function () {
  console.log("Listening on Port 3001");
});

app.post("/add", function (req, res) {
  console.log("Added");
  res.json({ added: true });
});

app.post("/delete", function (req, res) {
  console.log("Deleted");
  res.json({ deleted: true });
});

app.post("/search", function (req, res) {
  console.log("Searched");
  res.json({ searched: true });
});

app.post("/autocomplete", function (req, res) {
  console.log("Autocompleted words");
  res.json({ autocompleted: true });
});

app.get("/display", function (req, res) {
  console.log("Displayed");
  res.json({ displayed: true });
});
