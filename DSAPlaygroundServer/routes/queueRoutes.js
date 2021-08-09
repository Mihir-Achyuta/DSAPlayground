const express = require("express");
const router = express.Router();

const { isAuthenticated } = require("../handlers/authHandlers");

router.get("/displayqueue:name", isAuthenticated);

router.post("/enqueue/:name/:number", isAuthenticated);
router.post("/dequeue/:name", isAuthenticated);

router.delete("/deletequeue/:name");

module.exports = { router };
