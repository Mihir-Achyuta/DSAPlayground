const express = require("express");
const {
  serverWorking,
  displayTrie,
  resetTrie,
  addToTrie,
  deleteFromTrie,
  searchInTrie,
  autoCompleteTrie,
} = require("../handlers/trieHandlers");
const router = express.Router();

router.get("/", serverWorking);
router.get("/displayTrie", displayTrie);
router.get("/resetTrie", resetTrie);

router.post("/addTrie", addToTrie);
router.post("/deleteTrie", deleteFromTrie);
router.post("/searchTrie", searchInTrie);
router.post("/autocompleteTrie", autoCompleteTrie);

module.exports = router;
