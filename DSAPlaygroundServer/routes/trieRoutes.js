const express = require("express");

const { isAuthenticated } = require("../handlers/authHandlers");
const {
  displayTrie,
  resetTrie,
  addToTrie,
  deleteFromTrie,
  searchInTrie,
  autoCompleteTrie,
} = require("../handlers/trieHandlers");
const router = express.Router();

router.get("/displaytrie/:name", isAuthenticated, displayTrie);
router.get("/resettrie/:name", isAuthenticated, resetTrie);

router.post("/createtrie/:name", isAuthenticated);
router.post("/addtrie/:name/:word", isAuthenticated, addToTrie);
router.post("/deletetrie/:name/:word", isAuthenticated, deleteFromTrie);
router.post("/searchtrie/:name/:word", isAuthenticated, searchInTrie);
router.post("/autocompletetrie/:name/:word", isAuthenticated, autoCompleteTrie);

router.delete("/deletetrie/:name");

module.exports = router;
