const express = require("express");
const router = express.Router();

const { isAuthenticated } = require("../handlers/authHandlers");

router.get("/displaystack:name", isAuthenticated);

router.post("/pushstack/:name/:number", isAuthenticated);
router.post("/popstack/:name", isAuthenticated);

router.delete("/deletestack/:name");

module.exports = { router };
