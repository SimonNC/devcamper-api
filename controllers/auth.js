const geocoder = require("../utils/geocoder");
const User = require("../models/User");
const ErrorResponse = require("../utils/errorResponse");
const asyncHandler = require("../middleware/async");
const bcrypt = require("bcryptjs");

// @desc Register user
// @route POST /api/v1/auth/register
// @access Public
exports.registerUser = asyncHandler(async (req, res, next) => {
  const { name, email, password, role } = req.body;
  const user = await User.create({
    name,
    email,
    password,
    role,
  });

  const token = user.getSignedJwtToken();

  res.status(201).json({
    success: true,
    token,
  });
});

// @desc Login user
// @route POST /api/v1/auth/login
// @access Public
exports.login = asyncHandler(async (req, res, next) => {
  // validate email and password
  if (!req.body.email || !req.body.password) {
    return next(new ErrorResponse("Please provide an email and password", 400));
  }
  const user = await User.findOne({ email: req.body.email }).select(
    "+password"
  );
  if (!user) {
    return next(new ErrorResponse("Invalid credentials", 401));
  }
  //compare password with model method
  const isMatch = await user.matchPassword(req.body.password);
  if (!isMatch) {
    return next(new ErrorResponse("Invalid credentials", 401));
  }
  const token = user.getSignedJwtToken();
  res.status(200).json({
    success: true,
    token,
  });
});
