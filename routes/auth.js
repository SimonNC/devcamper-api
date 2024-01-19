const express = require("express");
const { registerUser, login } = require("../controllers/auth");

const router = express.Router();

router.post("/register", registerUser).post("/login", login);

module.exports = router;
