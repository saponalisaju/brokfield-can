const express = require("express");
const router = express.Router();
const sliderController = require("../controllers/sliderController");
const { validateSlider } = require("../validate/userAuth");
const { runValidation } = require("../validate");
const { uploadSlider } = require("../helpers/uploadCloudFile");

router.get("/fetchSlider", sliderController.fetchSlider);
router.post(
  "/addSlider",
  uploadSlider.single("image"),
  validateSlider,
  runValidation,
  sliderController.addSlider
);
router.put("/updateSlider/:id", sliderController.updateSlider);
router.delete("/deleteSlider/:id", sliderController.deleteSlider);

module.exports = router;
