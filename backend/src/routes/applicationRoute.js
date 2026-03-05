const express = require("express");
const router = express.Router();
const applicationController = require("../controllers/applicationController");

const { applicationValidate } = require("../validate/applicationValidate");
const { runValidation } = require("../validate");
const {
  uploadApplication,
  uploadApplicationAdd,
} = require("../helpers/uploadCloudFile");

router.get("/fetchApplication", applicationController.fetchApplication);
router.get("/fetchApplication/:id", applicationController.fetchApplicationById);
router.get(
  "/fetchApplicationEnquiry",
  applicationController.fetchApplicationEnquiry
);

router.post(
  "/addApplication",
  uploadApplication.single("image"),
  applicationValidate,
  runValidation,
  applicationController.addApplication
);

router.put(
  "/updateApplication/:id",
  uploadApplication.single("image"),
  applicationController.updateApplication
);

router.put(
  "/updateApplicationAdd/:id",
  uploadApplicationAdd.fields([
    { name: "file1" },
    { name: "file2" },
    { name: "file3" },
    { name: "file4" },
    { name: "file5" },
    { name: "file6" },
    { name: "file7" },
    { name: "file8" },
    { name: "file9" },
    { name: "file10" },
    { name: "file11" },
    { name: "file12" },
  ]),
  applicationController.updateApplicationAdd
);
router.put(
  "/updateApplicationApprove/:id",
  applicationController.updateApplicationApprove
);
router.put(
  "/updateApplicationPending/:id",
  applicationController.updateApplicationPending
);
router.put(
  "/updateApplicationReject/:id",
  applicationController.updateApplicationReject
);

router.delete(
  "/deleteApplication/:id",
  applicationController.deleteApplication
);
module.exports = router;
