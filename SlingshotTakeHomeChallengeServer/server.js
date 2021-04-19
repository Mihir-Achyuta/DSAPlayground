const express = require("express");
const app = express();

app.post("/add", function (req, res) {
  console.log("Added");
});

app.post("/delete", function (req, res) {
  console.log("Deleted");
});

app.get("/search", function (req, res) {
  console.log("Searched");
});

app.get("/autocomplete", function (req, res) {
  console.log("Autocompleted words");
});

app.get("/display", function (req, res) {
  console.log("Displayed");
});
