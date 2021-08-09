const express = require("express");
const router = express.Router();

const { isAuthenticated } = require("../handlers/authHandlers");

router.get("/displaylist/:name", isAuthenticated);

router.post("/insertlist/:name/:number/:index");
router.post("/removelist/:name/:number/:index");
router.post("/setlist/:name/:number/:index");
router.post("/getlist/:name/:number/:index");

router.delete("/deletelist/:name", isAuthenticated);

module.exports = router;
