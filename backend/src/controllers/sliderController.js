const { deleteImage } = require("../helpers/deleteFileImage");
const Slider = require("../models/sliderModel");
const path = require("path");
const fs = require("fs");
const { uploadSliderFile } = require("../helpers/uploadCloudFile");
const {
  deleteFileFromCloudinary,
  publicIdFromUrl,
} = require("../helpers/deleteFileCloudinary");

exports.fetchSlider = async (req, res) => {
  try {
    const usersAll = await Slider.find({});
    res.json(usersAll);
  } catch (error) {
    console.error("Error fetching sliders:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};
exports.addSlider = async (req, res) => {
  try {
    const image = req.file?.path;

    if (!req.file || !req.body.title) {
      return res.status(400).json({ message: "Image and title are required" });
    }

    let secure_url = "default.png";
    let public_id = "";

    if (image) {
      ({ secure_url, public_id } = await uploadSliderFile(
        image,
        "canadaPermit/slider"
      ));
    }

    const newSlider = new Slider({
      ...req.body,
      image: secure_url,
      imagePublicId: public_id,
    });
    await newSlider.save();
    res.status(201).json(newSlider);
  } catch (error) {
    console.error("Error adding slider:", error);
    res.status(500).json({ message: error.message });
  }
};

exports.updateSlider = async (req, res) => {
  try {
    const { id } = req.params;
    const sliderExist = await Slider.findById(id);
    if (!sliderExist) {
      return res.status(404).json({ message: "Slider not found" });
    }
    const updatedSlider = await Slider.findByIdAndUpdate(id, req.body, {
      new: true,
      runValidators: true,
    });
    res.json(updatedSlider);
  } catch (error) {
    console.error("Error updating slider:", error);
    res.status(500).json({ message: error.message });
  }
};

exports.deleteSlider = async (req, res) => {
  const { id } = req.params;
  try {
    const slider = await Slider.findByIdAndDelete(id);
    if (!slider) {
      return res.status(404).json({ message: "Slider not found" });
    }

    if (slider.image) {
      const publicId = publicIdFromUrl(slider.image);
      await deleteFileFromCloudinary(publicId);
    }
    res.json({ message: "Slider is deleted" });
  } catch (error) {
    console.error("Error deleting slider:", error);
    res.status(500).json({ message: error.message });
  }
};
