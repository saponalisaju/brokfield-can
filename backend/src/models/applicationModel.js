require("dotenv").config();

const mongoose = require("mongoose");
const { defaultImagePath } = require("../../secret");
const formatDate = () => {
  const date = new Date();
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");
  return `${year}-${month}-${day}`;
};

const applicationSchema = mongoose.Schema(
  {
    surname: { type: String, required: true },
    givenN: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    phone: { type: Number, required: true },
    nationalId: { type: String, required: true },
    sex: { type: String, required: true, enum: ["Male", "Female"] },
    dob: { type: Date, required: true, index: true },
    birthCity: { type: String, required: true },
    currentN: { type: String, required: true },
    identification: { type: String, required: true },
    company: { type: String, required: true },
    dutyDuration: { type: String, required: true },
    jobTitle: { type: String, required: true },
    salary: { type: String, required: true },
    image: { type: String, default: "default.png", required: true },
    imagePublicId: { type: String, default: "" },

    file1: [{ type: String, default: "default.png" }],
    file1PublicId: [{ type: String, default: "" }],

    passport: { type: String, required: true, index: true },
    issuedCountry: { type: String, required: true },
    isStatus: { type: String, default: "Pending" },
    isAdmin: { type: Boolean, default: true },
    pending: { type: String, default: formatDate },
    approve: { type: String, default: "" },
  },
  { timestamps: true }
);

const Application = mongoose.model("Application", applicationSchema);
module.exports = Application;
