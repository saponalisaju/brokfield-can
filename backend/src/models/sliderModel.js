const mongoose = require("mongoose");

const sliderSchema = new mongoose.Schema(
  {
    thumbnail: { type: String, required: true },
    title: { type: String, required: true },
    image: { type: String, required: true, default: "default.png" },
    imagePublicId: { type: String, default: "" },
    status: { type: String, default: "active" },
  },
  { timestamps: true }
);
const Slider = mongoose.model("Slider", sliderSchema);
module.exports = Slider;
