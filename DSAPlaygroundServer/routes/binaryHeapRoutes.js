const express = require("express");
const router = express.Router();

const { isAuthenticated } = require("../handlers/authHandlers");
const {
  displayHeap,
  createHeap,
  deleteHeap,
  insertInHeap,
  extractFromHeap,
} = require("../handlers/binaryHeapHandlers");

router.get("/displayheap/:name", isAuthenticated, displayHeap);

router.post("/createheap/:name", isAuthenticated, createHeap);
router.post("/insertheap/:name/:number", isAuthenticated, insertInHeap);
router.post("/extractheap/:name", isAuthenticated, extractFromHeap);

router.delete("/deleteheap/:name", isAuthenticated, deleteHeap);

module.exports = router;
