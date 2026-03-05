const { body } = require("express-validator");

exports.applicationValidate = [
  body("surname")
    .trim()
    .notEmpty()
    .withMessage("Surname is required. Enter your fullname")
    .isLength({ min: 3, max: 31 })
    .withMessage("Name should be at least 3-24 character long"),

  body("givenN")
    .trim()
    .notEmpty()
    .withMessage("Given Name is required. Enter your fullname")
    .isLength({ min: 3, max: 31 })
    .withMessage("Name should be at least 3-24 character long"),

  body("email")
    .trim()
    .notEmpty()
    .withMessage("Email is required. Enter your email address")
    .isEmail()
    .withMessage("Invalid email"),

  body("phone").trim().notEmpty().withMessage("Phone number required"),

  body("nationalId")
    .trim()
    .notEmpty()
    .withMessage("National id number required"),

  body("sex").trim().notEmpty().withMessage("Male or female required"),
  body("dob").trim().notEmpty().withMessage("Date of Birth required"),

  body("birthCity").trim().notEmpty().withMessage("Nationality required"),
  body("currentN")
    .trim()
    .notEmpty()
    .withMessage("Current Nationality required"),

  body("identification")
    .trim()
    .notEmpty()
    .withMessage("Identification required"),

  body("company").trim().notEmpty().withMessage("Company required"),
  body("dutyDuration").trim().notEmpty().withMessage("Duty duration required"),

  body("jobTitle").trim().notEmpty().withMessage("Job title required"),
  body("salary").trim().notEmpty().withMessage("Salary required"),

  body("image")
    .optional()
    .custom((value, { req }) => {
      if (!req.file) {
        throw new Error("Application image is required");
      }
      return true;
    })
    .withMessage("User image is required"),

  body("file1")
    .optional()
    .custom((value, { req }) => {
      if (!req.file) {
        throw new Error("User file is required");
      }
      return true;
    }),

  body("passport").trim().notEmpty().withMessage("Passport number required"),
  body("issuedCountry")
    .trim()
    .notEmpty()
    .withMessage("IssuedCountry number required"),
];
