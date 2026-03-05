const bcrypt = require("bcryptjs");
const crypto = require("crypto");
const createError = require("http-errors");
const jwt = require("jsonwebtoken");
const cookie = require("cookie-parser");
const User = require("../models/userModel");
const MY_KEY = "MY_LOGIN_KEY";

const {
  successResponse,
  errorResponse,
} = require("../helpers/responseHelpers");
const mongoose = require("mongoose");
const {
  jwtActivationKey,
  jwtAccessKey,
  jwtRefreshKey,
} = require("../../secret");
const { createToken } = require("../helpers/jsonwebtoken");
const data = require("../../data");
const Application = require("../models/applicationModel");

exports.register = async (req, res, next) => {
  const { name, email, password } = req.body;
  if (!name || !email || !password) {
    return res
      .status(400)
      .json({ success: false, msg: "All fields are required" });
  }
  try {
    const existingUser = await User.exists({ email });
    if (existingUser) {
      return res
        .status(400)
        .json({ success: false, msg: "User already exists" });
    }
    const user = new User({
      name,
      email,
      password,
    });
    const savedUser = await user.save();
    return res.status(201).json({
      success: true,
      message: "User created successfully",
      user: {
        id: savedUser._id,
        email: savedUser.email,
      },
    });
  } catch (error) {
    return res
      .status(500)
      .json({ success: false, message: "Server error", error: error.message });
  }
};

exports.addUser = async (req, res, next) => {
  const { name, email, password } = req.body;
  if (!name || !email || !password) {
    return res
      .status(400)
      .json({ success: false, msg: "All fields are required" });
  }
  try {
    // const existingUser = await User.exists({ email });
    // if (existingUser) {
    //   return res
    //     .status(400)
    //     .json({ success: false, msg: "User already exists" });
    // }
    const user = new User({
      isAdmin: true,
      name,
      email,
      password,
    });
    const savedUser = await user.save();
    return res.status(201).json({
      success: true,
      message: "User created successfully",
      user: {
        id: savedUser._id,
        email: savedUser.email,
      },
    });
  } catch (error) {
    return res
      .status(500)
      .json({ success: false, message: "Server error", error: error.message });
  }
};

exports.login = async (req, res, next) => {
  const { email, password } = req.body;
  try {
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(401).json("User not found ");
    }
    const isPasswordValid = bcrypt.compareSync(password, user.password);
    if (!isPasswordValid) {
      return res.status(401).json("Invalid email or password");
    }

    const token = createToken({ id: user._id }, jwtActivationKey, "30m");
    const refreshToken = createToken({ id: user._id }, jwtActivationKey, "7d");

    res.cookie("accessToken", token, {
      maxAge: 30 * 60 * 1000, // 30 minute
      httpOnly: true,
      secure: true,
      sameSite: "Strict",
    });

    res.cookie("refreshToken", refreshToken, {
      maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days
      httpOnly: true,
      secure: true,
      sameSite: "Strict",
    });

    return res.status(200).json({
      success: true,
      message: "Login successful",
      token: `Bearer ${token}`,
      refreshToken: refreshToken,
    });
  } catch (error) {
    next(error);
  }
};

exports.getUsers = async (req, res, next) => {
  try {
    const superEmail = "manikkibrya@gmail.com";
    const users = await User.find({ email: { $ne: superEmail } });
    if (!users) {
      res.status(404).json("users not found");
    }
    res.json(users);
  } catch (error) {
    next(error);
  }
};

exports.logout = async (req, res, next) => {
  try {
    res.clearCookie("token", {
      httpOnly: true,
      secure: true,
      sameSite: "none",
    });
    res.clearCookie("accessToken", {
      httpOnly: true,
      secure: true,
      sameSite: "none",
    });
    res.clearCookie("refreshToken", {
      httpOnly: true,
      secure: true,
      sameSite: "none",
    });
    return res.status(200).json({
      success: true,
      message: "User logged out successfully",
    });
  } catch (error) {
    next(error);
  }
};

// const passportJWT = passport.authenticate("jwt", { session: false });

exports.dashboard = [
  (req, res, next) => {
    try {
      return res.status(200).json({
        success: true,
        user: {
          id: req.user._id,
          email: req.user.email,
        },
      });
    } catch (error) {
      next(error);
    }
  },
];

exports.getDashboardData = [
  async (req, res) => {
    try {
      const dashboardData = { applications: 14, pages: 0 };
      res.setHeader("Content-Type", "application/json");
      res.status(200).json(dashboardData);
    } catch (error) {
      console.error("Error fetching dashboard data:", error.message);
      res.setHeader("Content-Type", "application/json");
      res.status(500).json({
        message: "Error fetching dashboard data",
        error: error.message,
      });
    }
  },
];

exports.deleteUser = async (req, res, next) => {
  try {
    const { id } = req.params;
    const user = await User.findByIdAndDelete({ _id: id });
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    res.json("user deleted successfully");
  } catch (error) {
    next(error);
  }
};

exports.updateUser = async (req, res, next) => {
  const { id } = req.params;
  try {
    const updatedUser = await User.findByIdAndUpdate(id, req.body, {
      new: true,
    });
    await updatedUser.save();
    res.json(updatedUser);
  } catch (error) {
    if (error instanceof mongoose.Error.CastError) {
      throw createError(400, "Invalid Id");
    }
    throw error;
  }
};
