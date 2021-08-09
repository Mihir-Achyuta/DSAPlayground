const express = require("express");
const router = express.Router();

const { isAuthenticated } = require("../handlers/authHandlers");

router.get("/displaybst", isAuthenticated);
router.get("/searchbst/:name", isAuthenticated);

router.post("/createbst/:name", isAuthenticated);
router.post("/insertbst/number", isAuthenticated);

router.delete("/deletebst", isAuthenticated);

module.exports = router;
