const express = require("express");
const router = express.Router();

const { isAuthenticated } = require("../handlers/authHandlers");

router.get("/displaylist/:name", isAuthenticated);

router.post("/createlist/:name", isAuthenticated);
router.post("/insertlist/:name/:number/:index", isAuthenticated);
router.post("/removelist/:name/:number/:index", isAuthenticated);
router.post("/setlist/:name/:number/:index", isAuthenticated);
router.post("/getlist/:name/:number/:index", isAuthenticated);

router.delete("/deletelist/:name", isAuthenticated);

module.exports = router;
