const Application = require("../models/applicationModel");
const moment = require("moment");
const { uploadApplicationFile } = require("../helpers/uploadCloudFile");
const {
  publicIdFromUrl,
  deleteFileFromCloudinary,
} = require("../helpers/deleteFileCloudinary");
const {
  sendEmailJobLetter,
  sendEmailApplicationApproved,
} = require("../helpers/mail");

exports.fetchApplication = async (req, res) => {
  try {
    const page = Number(req.query.page) || 1;
    const limit = Number(req.query.limit) || 10;
    const search = req.query.search || "";

    const query = {
      passport: { $regex: search, $options: "i" },
    };

    const applications = await Application.find(query)
      .limit(limit)
      .skip((page - 1) * limit);

    const count = await Application.countDocuments(query);

    res.json({
      applications,
      totalPages: Math.ceil(count / limit),
      currentPage: page,
      totalApplication: count,
    });
  } catch (error) {
    console.error("Error fetching applications:", error);
    res.status(500).json({
      message: "An error occurred while fetching applications",
    });
  }
};

exports.fetchApplicationById = async (req, res) => {
  try {
    const application = await Application.findById(req.params.id);

    if (!application) {
      return res.status(404).json({ message: "Application not found" });
    }

    res.json(application);
  } catch (error) {
    console.error("Error fetching application:", error);
    res.status(500).json({ message: "Server error" });
  }
};

exports.fetchApplicationEnquiry = async (req, res) => {
  try {
    const passport = (req.query.passport || "").trim();
    const dob = req.query.dob ? new Date(req.query.dob) : null;
    const name = (req.query.name || "").trim();

    if (!passport || !dob) {
      return res.status(400).json({
        message: "Passport and Date of Birth are required",
      });
    }

    // normalize dob day range
    const startOfDay = new Date(dob);
    startOfDay.setHours(0, 0, 0, 0);

    const endOfDay = new Date(dob);
    endOfDay.setHours(23, 59, 59, 999);

    const query = {
      passport: passport,
      dob: { $gte: startOfDay, $lte: endOfDay },
    };

    // optional name validation (NOT regex heavy)
    if (name) {
      query.$or = [{ surname: name }, { givenN: name }];
    }

    const application = await Application.findOne(query);

    if (!application) {
      return res.status(404).json({
        message: "No application found. Please check your details.",
      });
    }

    res.json({ applications: [application] });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
};

exports.addApplication = async (req, res) => {
  try {
    const existingUser = await Application.findOne({
      $or: [
        { email: (req.body.email || "").toLowerCase().trim() },
        { passport: (req.body.passport || "").trim() },
      ],
    });

    if (existingUser) {
      return res
        .status(400)
        .json({ message: "User with this email or passport already exists." });
    }
    if (!req.file || !req.body.email) {
      return res
        .status(400)
        .json({ message: "Both file and email are required." });
    }
    const image = req.file?.path;
    let secure_url = "default.png";
    let public_id = "";
    if (image) {
      ({ secure_url, public_id } = await uploadApplicationFile(
        image,
        "cuser/application",
      ));
    }
    const newApplication = new Application({
      ...req.body,
      image: secure_url,
      imagePublicId: public_id,
    });
    await newApplication.save();
    console.log(newApplication);
    res.status(201).json(newApplication);
  } catch (error) {
    console.error("Error adding application:", error);
    res.status(500).json({
      message: "Error adding application. Please try again.",
      error: error.message,
    });
  }
};

exports.updateApplication = async (req, res) => {
  try {
    const { id } = req.params;
    const existingUser = await Application.findById(id);
    if (!existingUser) {
      return res.status(404).json({ message: "Application not found" });
    }
    const image = req.file?.path;
    const updateField = {};
    if (image) {
      const { secure_url, public_id } = await uploadApplicationFile(
        image,
        "cuser/application",
      );
      updateField.image = secure_url;
      updateField.imagePublicId = public_id;

      if (existingUser.image) {
        const publicId = publicIdFromUrl(existingUser.image);
        await deleteFileFromCloudinary(publicId);
      }
    }
    const updatedUser = await Application.findByIdAndUpdate(
      id,
      { ...req.body, ...updateField },
      {
        new: true,
      },
    );
    await updatedUser.save();
    res.json(updatedUser);
  } catch (error) {
    res.status(500).send(error.message);
  }
};

exports.updateApplicationAdd = async (req, res) => {
  try {
    const { id } = req.params;
    const existingUser = await Application.findById(id);
    if (!existingUser) {
      return res.status(404).json({ message: "Application not found" });
    }

    const files = req.files;
    const file1URLs = [];
    const file1PublicIds = [];

    for (const file of files.file1) {
      const { secure_url, public_id } = await uploadApplicationFile(
        file.path,
        `cuser/file1`,
      );

      file1URLs.push(secure_url);
      file1PublicIds.push(public_id);
    }

    const updatedApplication = await Application.findByIdAndUpdate(
      id,
      {
        $push: {
          file1: { $each: file1URLs },
          file1PublicId: { $each: file1PublicIds },
        },
      },
      { new: true },
    );
    if (!updatedApplication) {
      res.status(404).send("Application not found");
    }

    if (existingUser.file1) {
      await sendEmailJobLetter(existingUser.email, existingUser.surname);
    }

    res.status(200).json(updatedApplication);
  } catch (error) {
    console.error("Error updating application:", error);
    res.status(500).send(`Server Error: ${error.message}`);
  }
};

exports.updateApplicationApprove = async (req, res) => {
  try {
    const { id } = req.params;
    const appUser = await Application.findById(id);
    if (appUser) {
      const updatedUser = await Application.findByIdAndUpdate(
        id,

        { approve: moment().format("YYYY-MM-DD"), isStatus: "Approved" },
        { new: true },
      );

      await sendEmailApplicationApproved(appUser.email, appUser.surname);

      res.json(updatedUser);
    } else {
      res.status(404).json({ message: "Application not found" });
    }
  } catch (error) {
    res.status(500).send(error.message);
  }
};

exports.updateApplicationPending = async (req, res) => {
  try {
    const { id } = req.params;

    const updatedUser = await Application.findByIdAndUpdate(
      id,
      { ...req.body, isStatus: "pending" },
      { new: true },
    );

    if (!updatedUser) {
      return res.status(404).json({ message: "Application not found" });
    }

    res.json(updatedUser);
  } catch (error) {
    console.error("Error updating application:", error);
    res.status(500).send(error.message);
  }
};

exports.updateApplicationReject = async (req, res) => {
  try {
    const { id } = req.params;
    const appUser = await Application.findById(id);
    if (appUser) {
      const updatedUser = await Application.findByIdAndUpdate(
        id,
        { isStatus: "rejected" },
        { new: true },
      );
      res.json(updatedUser);
    } else {
      res.status(404).json({ message: "Application not found" });
    }
  } catch (error) {
    res.status(500).send(error.message);
  }
};

exports.deleteApplication = async (req, res) => {
  const { id } = req.params;
  try {
    const application = await Application.findByIdAndDelete({ _id: id });
    if (!application) {
      return res.status(404).json({ message: "Application not found" });
    }

    const filePublicIds = [
      application.imagePublicId,
      application.file1PublicId,
      application.file2PublicId,
      application.file3PublicId,
      application.file4PublicId,
      application.file5PublicId,
      application.file6PublicId,
    ].filter(Boolean); // Filter out any undefined values

    if (filePublicIds.length > 0) {
      await Promise.all(
        filePublicIds.map((publicId) =>
          deleteFileFromCloudinary(publicId).catch((error) => {
            console.error(
              `Error deleting file with public_id ${publicId}:`,
              error,
            );
          }),
        ),
      );
    }

    res.json({ message: "Application deleted" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.getApplicationUser = async (req, res) => {
  try {
    const { passport } = req.params;
    const applications = await Application.findOne({ passport });
    if (applications) {
      res.json(applications);
    } else {
      res.status(404).send("User not found");
    }
  } catch (error) {
    console.error(error);
    a;
    res.status(500).send("Server error");
  }
};
