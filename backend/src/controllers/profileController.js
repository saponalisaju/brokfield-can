const User = require("../models/userModel");
const createError = require("http-errors");

exports.profile = async (req, res, next) => {
  const { name, email, password, confirmPassword } = req.body;
  if (password !== confirmPassword) {
    return res
      .status(400)
      .json({ success: false, message: "Passwords do not match" });
  }
  try {
    const existUser = await User.exists({ email });
    if (!existUser)
      throw createError(409, "User all ready exist : Please sign in");

    const user = new User({
      name,
      email,
      password,
    });
    const saveUser = await user.save();
    res.status(201).json({
      success: true,
      message: "Admin created successfully",
      user: {
        id: saveUser._id,
        email: saveUser.email,
      },
    });
  } catch (error) {
    return res
      .status(500)
      .json({ success: false, message: "Server error", error: error.message });
  }
};
