const express = require("express");

const {
  signUp,
  signIn,
  signOut,
  isAuthenticated,
  isNotAuthenticated,
} = require("../handlers/authHandlers");
const router = express.Router();

router.post("/signup", isNotAuthenticated, signUp);
router.post("/signin", isNotAuthenticated, signIn);
router.post("/signout", isAuthenticated, signOut);

module.exports = router;
