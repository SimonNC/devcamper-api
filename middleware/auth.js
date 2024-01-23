/**
 * Middleware functions for handling authentication and authorization:
 *
 * - protect: Verifies JWT token from request headers or cookies.
 *   Decodes token and attaches user object to request.
 *
 * - authorize: Checks if user role is authorized to access route.
 *   Returns 403 error if not authorized.
 */
const jwt = require("jsonwebtoken");
const asyncHandler = require("./async");
const ErrorResponse = require("../utils/errorResponse");
const User = require("../models/User");

//Protect routes
exports.protect = asyncHandler(async (req, res, next) => {
  let token;
  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith("Bearer")
  ) {
    //set token from Bearer token
    token = req.headers.authorization.split(" ")[1];
  } else if (req.cookies.token) {
    //set token from cookie
    token = req.cookies.token;
  }
  if (!token) {
    return next(
      new ErrorResponse("Not authorized to access this route 1", 401)
    );
  }
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    console.log(decoded);
    req.user = await User.findById(decoded.id);
    next();
  } catch (error) {
    return next(
      new ErrorResponse("Not authorized to access this route 2", 401)
    );
  }
});

//Grant access to specific roles
exports.authorize = (...roles) => {
  return (req, res, next) => {
    if (!roles.includes(req.user.role)) {
      return next(
        new ErrorResponse(
          `User role ${req.user.role} is not authorized to access this route`,
          403
        )
      );
    }
    next();
  };
};
