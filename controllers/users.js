const { validationResult } = require("express-validator");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const User = require("../models/user");
const fileHelper = require("../util/file");

//Controller function to handle Get User Details Requests
exports.getUser = (req, res, next) => {
  if (req.params.userId !== req.userId) {
    const error = new Error("Not authorized!");
    error.statusCode = 403;
    throw error;
  }
  const userId = req.params.userId;
  User.findById(userId)
    .then((user) => {
      res.status(200).json({
        message: "User fetched.",
        user: {
          userId: user._id,
          firstName: user.firstName,
          lastName: user.lastName,
          email: user.email,
          image: user.imagePath,
        },
      });
    })
    .catch((err) => {
      if (!err.statusCode) {
        err.statusCode = 500;
      }
      next(err);
    });
};

//Controller function to handle Edit User
exports.editUser = (req, res, next) => {
  const userId = req.params.userId;
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    const error = new Error("Validation Failed");
    error.statusCode = 422;
    error.data = errors.array();
    if (req.file) {
      fileHelper.deleteFile(req.file.path);
    } else {
      error.data.push({
        value: "image",
        msg: "Please upload a valid Image.#",
        param: "image",
      });
    }
    throw error;
  }
  if (!req.file) {
    const error = new Error("Please Upload a valid @Image.");
    error.statusCode = 422;
    throw error;
  }
  const imagePath = req.file.path;
  const email = req.body.email;
  const firstName = req.body.firstName;
  const lastName = req.body.lastName;
  const password = req.body.password;
  bcrypt
    .hash(password, 12)
    .then((hashedPw) => {
      const user = {
        email: email,
        password: hashedPw,
        firstName: firstName,
        lastName: lastName,
        imagePath: imagePath,
      };
      return User.findByIdAndUpdate(userId, user, {
        new: true,
      });
    })
    .then((result) => {
      res.status(201).json({ message: "User Updated!", userId: result._id });
    })
    .catch((err) => {
      if (!err.statusCode) {
        err.statusCode = 500;
      }
      next(err);
    });
};
