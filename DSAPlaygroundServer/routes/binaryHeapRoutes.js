const express = require("express");
const router = express.Router();

const { isAuthenticated } = require("../handlers/authHandlers");
const {
  displayHeap,
  createHeap,
  insertInHeap,
  extractFromHeap,
} = require("../handlers/binaryHeapHandlers");

router.get("/displayheap/:name", isAuthenticated, displayHeap);

router.post("/createheap/:name", isAuthenticated, createHeap);
router.post("/insertinheap/:name/:number", isAuthenticated, insertInHeap);
router.post("/extractfromheap/:name", isAuthenticated, extractFromHeap);

module.exports = router;
