const { validationResult } = require("express-validator");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const User = require("../models/user");
const fileHelper = require("../util/file");

const { AppError } = require("../lib/AppError");

//Controller function to handle Signup
exports.signup = (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    const error = new AppError("Validation Failed", "Validation Error", 422);
    error.data = errors.array();
    if (req.file) {
      fileHelper.deleteFile(req.file.path);
    } else {
      error.data.push({
        value: "image",
        msg: "Please upload a valid Image.#",
        param: "image"
      });
    }
    throw error;
  }
  if (!req.file) {
    // Please change to Appropriate error type, I put validationError for now
    throw new AppError("Please Upload a valid @Image.", "ValidationError", 422);
  }
  const imagePath = req.file.path;
  const email = req.body.email;
  const firstName = req.body.firstName;
  const lastName = req.body.lastName;
  const password = req.body.password;
  bcrypt
    .hash(password, 12)
    .then((hashedPw) => {
      const user = new User({
        email: email,
        password: hashedPw,
        firstName: firstName,
        lastName: lastName,
        imagePath: imagePath
      });
      return user.save();
    })
    .then((result) => {
      res.status(201).json({ message: "User Created!", userId: result._id });
    })
    .catch((err) => {
      throw new AppError(
        "Something went wrong try again",
        "InternalError",
        500
      );
    });
};

//Controller function to handle login and send JWT in response
exports.login = (req, res, next) => {
  const email = req.body.email;
  const password = req.body.password;
  let loadedUser;
  User.findOne({ email: email })
    .then((user) => {
      if (!user) {
        const error = new Error("A user with this email could not be found.");
        error.statusCode = 401;
        throw error;
      }
      loadedUser = user;
      return bcrypt.compare(password, user.password);
    })
    .then((isEqual) => {
      if (!isEqual) {
        const error = new Error("Wrong password!");
        error.statusCode = 401;
        throw error;
      }
      const token = jwt.sign(
        {
          email: loadedUser.email,
          userId: loadedUser._id.toString()
        },
        process.env.JWT_SECRET,
        { expiresIn: "1h" }
      );
      res.status(200).json({ token: token, userId: loadedUser._id.toString() });
    })
    .catch((err) => {
      throw new AppError(
        "Something went wrong try again",
        "InternalError",
        500
      );
    });
};
