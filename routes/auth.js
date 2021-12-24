const express = require('express');
const { body } = require('express-validator');

const User = require('../models/user');
const catchASync = require('../util/catchASync');

const authController = require('../controllers/auth');

const router = express.Router();

//Using Express Validator to validate the requests
//Email, EmployeeId should be unique for user who is trying to signup
//Password must of mininmum 5 character
//First Name, Last Name, Organisation, EmployeeId must not be Empty/Null

router.post(
  '/signup',
  [
    body('email')
      .isEmail()
      .withMessage('Please enter a valid email.')
      .custom((value, { req }) => {
        return User.findOne({ email: value }).then((userDoc) => {
          if (userDoc) {
            return Promise.reject('E-Mail address already exists!');
          }
        });
      })
      .normalizeEmail(),
    body('password').trim().isLength({ min: 5 }),
    body('firstName').trim().not().isEmpty(),
    body('lastName').trim().not().isEmpty()
  ],
  catchASync(authController.signup)
);

router.post(
  '/login',
  [
    body('email')
      .isEmail()
      .withMessage('Please enter a valid email.')
      .normalizeEmail(),
    body('password').trim().isLength({ min: 5 })
  ],
  catchASync(authController.login)
);

module.exports = router;
