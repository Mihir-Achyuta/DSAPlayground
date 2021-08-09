const express = require("express");
const router = express.Router();

const { isAuthenticated } = require("../handlers/authHandlers");
const {
  displayBst,
  deleteBst,
  createBst,
  insertBst,
  searchBst,
} = require("../handlers/binarySearchTreeHandlers");

router.get("/displaybst/:name", isAuthenticated, displayBst);
router.get("/searchbst/:name/:number", isAuthenticated, searchBst);

router.post("/createbst/:name", isAuthenticated, createBst);
router.post("/insertbst/:name/:number", isAuthenticated, insertBst);

router.delete("/deletebst/:name", isAuthenticated, deleteBst);

module.exports = router;
