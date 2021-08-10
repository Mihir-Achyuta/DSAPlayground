const express = require("express");

const { isAuthenticated } = require("../handlers/authHandlers");
const {
  displayTrie,
  resetTrie,
  createTrie,
  addToTrie,
  deleteFromTrie,
  searchInTrie,
  autoCompleteTrie,
  deleteTrie,
} = require("../handlers/trieHandlers");
const router = express.Router();

router.get("/displaytrie/:name", isAuthenticated, displayTrie);
router.get("/resettrie/:name", isAuthenticated, resetTrie);

router.post("/createtrie/:name", isAuthenticated, createTrie);
router.post("/addtrie/:name/:word", isAuthenticated, addToTrie);
router.post("/deletetrie/:name/:word", isAuthenticated, deleteFromTrie);
router.post("/searchtrie/:name/:word", isAuthenticated, searchInTrie);
router.post("/autocompletetrie/:name/:word", isAuthenticated, autoCompleteTrie);

router.delete("/deletetrie/:name", isAuthenticated, deleteTrie);

module.exports = router;
