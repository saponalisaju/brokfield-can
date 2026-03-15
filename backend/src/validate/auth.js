const { body } = require("express-validator");

exports.validateUserRegister = [
  body("name")
    .trim()
    .notEmpty()
    .withMessage("Name is required. Enter your fullname")
    .isLength({ min: 4, max: 31 })
    .withMessage("Name should be at least 4-24 character long"),

  body("email")
    .trim()
    .notEmpty()
    .withMessage("Email is required. Enter your email address")
    .isEmail()
    .withMessage("Invalid email"),

  body("password")
    .trim()
    .notEmpty()
    .withMessage("Password is required. Enter your password"),

  body("accountName")
    .trim()
    .notEmpty()
    .withMessage("Account Name is required. Enter your name")
    .isLength({ min: 4, max: 31 })
    .withMessage("Name should be at least 4-24 character long"),

  body("accountNumber")
    .trim()
    .notEmpty()
    .withMessage("Account Number is required. Enter your Number"),
  // .matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{8,}$/)
  // .withMessage(
  //   "Minimum eight characters, at least one uppercase letter, one lowercase letter and one number:"
  // ),
];
exports.validateUserLogin = [
  body("email")
    .trim()
    .notEmpty()
    .withMessage("Email is required. Enter your email address")
    .isEmail()
    .withMessage("Invalid email"),

  body("password")
    .trim()
    .notEmpty()
    .withMessage("Password is required. Enter your password"),
  //.matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{8,}$/)
  // .withMessage(
  //   "Minimum eight characters, at least one uppercase letter, one lowercase letter and one number:"
  // ),
];
