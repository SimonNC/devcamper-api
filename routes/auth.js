const express = require("express");
const { registerUser, login, getMe } = require("../controllers/auth");

const router = express.Router();

const { protect } = require("../middleware/auth");

router
  .post("/register", registerUser)
  .post("/login", login)
  .get("/me", protect, getMe);

module.exports = router;
