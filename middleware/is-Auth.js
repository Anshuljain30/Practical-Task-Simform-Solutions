//Middleware to handle Authentication
const jwt = require("jsonwebtoken");
const { AppError } = require("../lib/AppError");

module.exports = (req, res, next) => {
  const token = req.get("Authorization");
  if (!token) {
    throw new AppError("Not authenticated.", "AuthenticationError", 401);
  }
  let decodedToken;
  try {
    decodedToken = jwt.verify(token, process.env.JWT_SECRET);
  } catch (err) {
    throw new AppError("Internal server error", "InternalError", 500);
  }
  if (!decodedToken) {
    throw new AppError("Not authenticated.", "AuthenticationError", 401);
  }
  req.userId = decodedToken.userId;
  next();
};
