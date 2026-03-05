const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "User name is required"],
      minLength: [4, "At least 4 character are needed"],
      maxLength: [24, "maximum 24 character are valid"],
      trim: true,
    },
    email: {
      type: String,
      required: [true, "email is required"],
      unique: true,
      lowercase: true,
      trim: true,
      validate: {
        validator: function (value) {
          return /\S+@\S+\.\S+/.test(value);
        },
        message: "Please enter a valid email address",
      },
    },
    password: {
      type: String,
      minLength: [6, "The length of user password can be 6 character"],
      set: (v) => bcrypt.hashSync(v, bcrypt.genSaltSync(10)),
    },
    // isAdmin: { type: Boolean, default: false },
  },
  { timestamps: true }
);

const User = mongoose.model("User", userSchema);

module.exports = User;
