const express = require("express");
const { body } = require("express-validator");

const User = require("../models/user");

const userController = require("../controllers/users");
const isAuth = require("../middleware/is-auth");

const router = express.Router();

//Using isAuth to allow access to only Authenticated Users

//Route for Edit User
//Method: PUT (REST method to be used for Updating Resourse)
router.put(
  "/:userId",
  isAuth,
  [
    body("email")
      .isEmail()
      .withMessage("Please enter a valid email.")
      .custom((value, { req }) => {
        return User.findOne({ email: value }).then((userDoc) => {
          if (userDoc) {
            if (userDoc._id.toString() !== req.userId) {
              return Promise.reject("E-Mail address already exists!");
            }
          }
        });
      })
      .normalizeEmail(),
    body("password").trim().isLength({ min: 5 }),
    body("firstName").trim().not().isEmpty(),
    body("lastName").trim().not().isEmpty(),
  ],
  userController.editUser
);

//Route to get User Details
router.get("/:userId", isAuth, userController.getUser);

module.exports = router;
