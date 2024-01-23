const express = require("express");
const {
  registerUser,
  login,
  logout,
  getMe,
  forgotPassword,
  resetPassword,
  updateDetails,
  updatePassword,
} = require("../controllers/auth");

const router = express.Router();

const { protect } = require("../middleware/auth");

router
  .post("/register", registerUser)
  .post("/login", login)
  .get("/logout", protect, logout)
  .post("/forgotpassword", forgotPassword)
  .put("/updatedetails", protect, updateDetails)
  .put("/updatepassword", protect, updatePassword)
  .put("/resetpassword/:resettoken", resetPassword)
  .get("/me", protect, getMe);

module.exports = router;
