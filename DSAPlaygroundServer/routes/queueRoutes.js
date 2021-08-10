const express = require("express");
const router = express.Router();

const { isAuthenticated } = require("../handlers/authHandlers");
const {
  displayQueue,
  createQueue,
  enqueue,
  dequeue,
  deleteQueue,
} = require("../handlers/queueHandlers");

router.get("/displayqueue:name", isAuthenticated, displayQueue);

router.post("/createqueue", isAuthenticated, createQueue);
router.post("/enqueue/:name/:number", isAuthenticated, enqueue);
router.post("/dequeue/:name", isAuthenticated, dequeue);

router.delete("/deletequeue/:name", isAuthenticated, deleteQueue);

module.exports = router;
