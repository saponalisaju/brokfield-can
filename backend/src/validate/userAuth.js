const { body } = require("express-validator");

exports.validateSlider = [
  body("thumbnail")
    .trim()
    .notEmpty()
    .withMessage("Thumbnail is required. ")
    .isLength({ min: 3, max: 31 })
    .withMessage("Thumbnail should be at least 4-24 character long"),

  body("title")
    .trim()
    .notEmpty()
    .withMessage("Title is required. ")
    .isLength({ min: 3, max: 31 })
    .withMessage("Title should be at least 4-24 character long"),

  body("image").custom((value, { req }) => {
    if (!req.file) {
      throw new Error("Slider image is required");
    }
    return true;
  }),
];

exports.validateUserManagement = [
  body("name")
    .trim()
    .notEmpty()
    .withMessage("Name is required. Enter your fullname")
    .isLength({ min: 3, max: 31 })
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
];
