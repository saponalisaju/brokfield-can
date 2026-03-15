const bcrypt = require("bcryptjs");
const createError = require("http-errors");
const User = require("../models/userModel");
const mongoose = require("mongoose");
const { jwtActivationKey } = require("../../secret");
const { createToken } = require("../helpers/jsonwebtoken");

// ✅ Sign up function
exports.signUp = async (req, res) => {
  const { name, email, password, accountName, accountNumber } = req.body;

  if (!name || !email || !password || !accountName || !accountNumber) {
    return res
      .status(400)
      .json({ success: false, msg: "All fields are required" });
  }

  try {
    // Prevent multiple admins (if needed)
    const adminExists = await User.findOne({ isAdmin: true });
    if (adminExists) {
      return res.status(400).json({ msg: "Admin already exists" });
    }

    const user = new User({
      isAdmin: true,
      name,
      email,
      password,
      accountName,
      accountNumber,
    });

    const savedUser = await user.save();

    return res.status(201).json({
      success: true,
      message: "User created successfully",
      user: {
        id: savedUser._id,
        name: savedUser.name,
        email: savedUser.email,
        accountName: savedUser.accountName,
        accountNumber: savedUser.accountNumber,
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
    // Fetch all users
    const users = await User.find(); // remove undefined email filter

    if (!users || users.length === 0) {
      return res.status(404).json({ success: false, msg: "Users not found" });
    }

    // Return users in consistent format
    return res.status(200).json({ success: true, users });
  } catch (error) {
    console.error("Error fetching users:", error);
    next(error); // pass to global error handler
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
