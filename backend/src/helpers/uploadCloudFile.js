const multer = require("multer");
const fs = require("fs");
const cloudinary = require("../config/cloudinary");

const ALLOWED_FILE_TYPES = ["image/jpeg", "image/png", "image/jpg"];
const MAX_FILE_SIZE = 10 * 1024 * 1024; // 10MB

const sliderStorage = multer.diskStorage({
  filename: (req, file, cb) => {
    cb(null, Date.now() + "-" + file.originalname);
  },
});

const applicationStorage = multer.diskStorage({
  filename: (req, file, cb) => {
    cb(null, Date.now() + "-" + file.originalname);
  },
});

const applicationAddStorage = multer.diskStorage({
  filename: (req, file, cb) => {
    cb(null, Date.now() + "-" + file.originalname);
  },
});

const fileFilter = (req, file, cb) => {
  if (ALLOWED_FILE_TYPES.includes(file.mimetype)) {
    cb(null, true);
  } else {
    cb(new Error("Invalid file type. Only JPEG, JPG and PNG are allowed"));
  }
};

const uploadSlider = multer({
  storage: sliderStorage,
  limits: { fileSize: MAX_FILE_SIZE },
  fileFilter: fileFilter,
});

const uploadApplication = multer({
  storage: applicationStorage,
  limits: { fileSize: MAX_FILE_SIZE },
  fileFilter: fileFilter,
});

const uploadApplicationAdd = multer({
  storage: applicationAddStorage,
  limits: { fileSize: MAX_FILE_SIZE },
  fileFilter: fileFilter,
});

const uploadApplicationAddFile = async (filePath, folder) => {
  try {
    const result = await cloudinary.uploader.upload(filePath, {
      folder: folder,
    });
    return { secure_url: result.secure_url, public_id: result.public_id };
  } catch (error) {
    console.error("Error uploading file to Cloudinary:", error);
    return { secure_url: "default.png", public_id: "" };
  }
};

const uploadSliderFile = async (image, folder) => {
  try {
    const response = await cloudinary.uploader.upload(image, {
      folder: folder,
    });
    console.log("File uploaded successfully to cloudinary");
    return { secure_url: response.secure_url, public_id: response.public_id };
  } catch (error) {
    console.error("Error uploading file:", error);
    throw error;
  }
};

const uploadApplicationFile = async (image, folder) => {
  try {
    const response = await cloudinary.uploader.upload(image, {
      folder: folder,
    });
    console.log("File uploaded successfully to cloudinary");
    return { secure_url: response.secure_url, public_id: response.public_id };
  } catch (error) {
    console.error("Error uploading file:", error);
    throw error;
  }
};

module.exports = {
  uploadSlider,
  uploadApplication,
  uploadApplicationAdd,
  uploadApplicationAddFile,
  uploadApplicationFile,
  uploadSliderFile,
};
