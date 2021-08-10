const express = require("express");
const router = express.Router();

const { isAuthenticated } = require("../handlers/authHandlers");
const {
  displayStack,
  createStack,
  pushStack,
  popStack,
  deleteStack,
} = require("../handlers/stackHandlers");

router.get("/displaystack:name", isAuthenticated, displayStack);

router.post("/createstack/:name", isAuthenticated, createStack);
router.post("/pushstack/:name/:number", isAuthenticated, pushStack);
router.post("/popstack/:name", isAuthenticated, popStack);

router.delete("/deletestack/:name", isAuthenticated, deleteStack);

module.exports = router;
